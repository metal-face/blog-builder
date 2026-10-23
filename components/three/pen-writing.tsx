import { Line } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { type ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";
import * as THREE from "three";
import type { LineSegments2 } from "three-stdlib";

const MAX_INK_SEGMENTS = 2000;
const MIN_INK_SPACING = 0.05;
const INK_FADE_SECONDS = 1.5;
const INK_COLOR = "#d4a24c";
const BLANK_INK = Array.from(
    { length: MAX_INK_SEGMENTS * 2 },
    () => [0, 0, 0] as [number, number, number]
);

// Tail-to-nib direction while writing, in camera space: nib down-left into the page, tail up-right toward the viewer.
const WRITING_DIRECTION = new THREE.Vector3(-0.45, -0.55, -0.7).normalize();
// The model's nib points along +z.
const PEN_AXIS = new THREE.Vector3(0, 0, 1);

const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane();
const normal = new THREE.Vector3();
const target = new THREE.Vector3();
const nib = new THREE.Vector3();
const goal = new THREE.Vector3();
const direction = new THREE.Vector3();
const pose = new THREE.Quaternion();
const parentRotation = new THREE.Quaternion();
const rest = new THREE.Quaternion();

export type InkStore = {
    line: LineSegments2 | null;
    segments: number;
    last: THREE.Vector3;
    penDown: boolean;
    opacity: number;
};

export const createInk = (): InkStore => ({
    line: null,
    segments: 0,
    last: new THREE.Vector3(),
    penDown: false,
    opacity: 1,
});

const clearInk = (ink: InkStore) => {
    ink.segments = 0;
    ink.penDown = false;
    ink.opacity = 1;
    if (ink.line) ink.line.geometry.instanceCount = 0;
};

// Appends a segment from the last point by writing it straight into the line's preallocated buffer.
// The first point after the pen is put down only marks where the stroke starts.
const addInk = (ink: InkStore, point: THREE.Vector3) => {
    if (!ink.line || ink.segments >= MAX_INK_SEGMENTS) return;
    if (!ink.penDown) {
        ink.penDown = true;
        ink.last.copy(point);
        return;
    }
    if (ink.last.distanceTo(point) < MIN_INK_SPACING) return;
    const { data } = ink.line.geometry.attributes.instanceStart as THREE.InterleavedBufferAttribute;
    data.array.set(
        [ink.last.x, ink.last.y, ink.last.z, point.x, point.y, point.z],
        ink.segments * 6
    );
    data.needsUpdate = true;
    ink.segments++;
    ink.line.geometry.instanceCount = ink.segments;
    ink.last.copy(point);
};

// Shift moves the pen into position; Shift + Command (or Ctrl) also puts ink down.
export function usePenKeys() {
    const [keys, setKeys] = useState({ positioned: false, inking: false });

    useEffect(() => {
        const isTyping = (e: KeyboardEvent) =>
            e.target instanceof HTMLElement &&
            (e.target.isContentEditable ||
                ["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName));
        const update = (e: KeyboardEvent) => {
            if (e.type === "keydown" && isTyping(e)) return;
            setKeys({ positioned: e.shiftKey, inking: e.shiftKey && (e.metaKey || e.ctrlKey) });
        };
        const release = () => setKeys({ positioned: false, inking: false });

        window.addEventListener("keydown", update);
        window.addEventListener("keyup", update);
        window.addEventListener("blur", release);
        return () => {
            window.removeEventListener("keydown", update);
            window.removeEventListener("keyup", update);
            window.removeEventListener("blur", release);
        };
    }, []);

    return keys;
}

// Finds the vertex furthest along the nib axis, in the writer group's space.
const findNib = (group: THREE.Group) => {
    const tip = new THREE.Vector3(0, 0, Number.NEGATIVE_INFINITY);
    const vertex = new THREE.Vector3();
    group.updateMatrixWorld();
    const toGroup = group.matrixWorld.clone().invert();
    group.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const positions = object.geometry.attributes.position;
        const toLocal = toGroup.clone().multiply(object.matrixWorld);
        for (let i = 0; i < positions.count; i++) {
            vertex.fromBufferAttribute(positions, i).applyMatrix4(toLocal);
            if (vertex.z > tip.z) tip.copy(vertex);
        }
    });
    return tip;
};

type PenWriterProps = {
    writing: boolean;
    inking: boolean;
    ink: InkStore;
    children: ReactNode;
};

// Moves its children into a writing pose with the nib on the cursor while `writing` is true,
// and puts ink down while `inking` is also true.
export function PenWriter({ writing, inking, ink, children }: PenWriterProps) {
    const group = useRef<THREE.Group>(null);
    const tip = useRef<THREE.Vector3 | null>(null);
    const pointer = useRef<THREE.Vector2 | null>(null);
    const canvas = useThree((state) => state.gl.domElement);

    // Track the cursor on the window, since page content overlaps the canvas.
    useEffect(() => {
        const move = (e: PointerEvent) => {
            const rect = canvas.getBoundingClientRect();
            pointer.current = new THREE.Vector2(
                ((e.clientX - rect.left) / rect.width) * 2 - 1,
                -((e.clientY - rect.top) / rect.height) * 2 + 1
            );
        };
        window.addEventListener("pointermove", move);
        return () => window.removeEventListener("pointermove", move);
    }, [canvas]);

    useFrame(({ camera }, delta) => {
        const pen = group.current;
        if (!pen?.parent) return;
        tip.current ??= findNib(pen);

        if (!writing || !pointer.current) {
            ink.penDown = false;
            const ease = 1 - Math.exp(-delta * 4);
            pen.position.lerp(goal.set(0, 0, 0), ease);
            pen.quaternion.slerp(rest, ease);
            return;
        }

        // Project the cursor onto a plane through the scene's centre, facing the camera.
        camera.getWorldDirection(normal);
        plane.setFromNormalAndCoplanarPoint(normal, goal.set(0, 0, 0));
        raycaster.setFromCamera(pointer.current, camera);
        if (!raycaster.ray.intersectPlane(plane, target)) return;

        direction.copy(WRITING_DIRECTION).applyQuaternion(camera.quaternion);
        pose.setFromUnitVectors(PEN_AXIS, direction);
        pen.parent.getWorldQuaternion(parentRotation);
        pose.premultiply(parentRotation.invert());
        pen.quaternion.slerp(pose, 1 - Math.exp(-delta * 10));

        // Shift the pen by however far the nib is from the cursor.
        pen.updateMatrixWorld();
        nib.copy(tip.current).applyMatrix4(pen.matrixWorld);
        pen.getWorldPosition(goal).add(target).sub(nib);
        pen.position.lerp(pen.parent.worldToLocal(goal), 1 - Math.exp(-delta * 20));

        if (inking && nib.distanceTo(target) < 0.5) addInk(ink, nib);
        else ink.penDown = false;
    });

    return <group ref={group}>{children}</group>;
}

type InkProps = { writing: boolean; ink: InkStore };

// The ink, in world space. Cleared when writing starts and faded out once it stops.
export function Ink({ writing, ink }: InkProps) {
    const line = useRef<LineSegments2>(null);

    useLayoutEffect(() => {
        ink.line = line.current;
        clearInk(ink);
    }, [ink]);

    useEffect(() => {
        if (writing) clearInk(ink);
    }, [writing, ink]);

    useFrame((_, delta) => {
        if (!line.current) return;
        if (!writing && ink.segments > 0) {
            ink.opacity = Math.max(0, ink.opacity - delta / INK_FADE_SECONDS);
            if (ink.opacity === 0) clearInk(ink);
        }
        line.current.material.opacity = ink.opacity;
    });

    return (
        <Line
            ref={line}
            segments
            points={BLANK_INK}
            color={INK_COLOR}
            lineWidth={3}
            transparent
            toneMapped={false}
            frustumCulled={false}
        />
    );
}
