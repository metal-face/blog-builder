import { useGLTF } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import { useLayoutEffect } from "react";
import type * as THREE from "three";
import type { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Body_body_pen01: THREE.Mesh;
        Body_body_pen_part_01: THREE.Mesh;
        Body_body_pen_part_02: THREE.Mesh;
        Body_body_pen_part_04: THREE.Mesh;
    };
    materials: {
        glossy_black: THREE.MeshPhysicalMaterial;
        gold: THREE.MeshPhysicalMaterial;
        chrome: THREE.MeshPhysicalMaterial;
        mat_black: THREE.MeshPhysicalMaterial;
    };
};

export function FountainPen(props: ThreeElements["group"]) {
    const { nodes, materials } = useGLTF("/fountain-pen.glb") as unknown as GLTFResult;

    // The exported materials are all fairly rough; tune them for a polished finish.
    useLayoutEffect(() => {
        Object.assign(materials.chrome, { metalness: 1, roughness: 0.1 });
        Object.assign(materials.gold, { metalness: 1, roughness: 0.25 });
        materials.gold.color.set("#d4a24c");
        Object.assign(materials.glossy_black, {
            roughness: 0.15,
            clearcoat: 1,
            clearcoatRoughness: 0.05,
        });
    }, [materials]);

    return (
        <group {...props} dispose={null}>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen01.geometry}
                material={materials.glossy_black}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen_part_01.geometry}
                material={materials.gold}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen_part_02.geometry}
                material={materials.chrome}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen_part_04.geometry}
                material={materials.mat_black}
            />
        </group>
    );
}

useGLTF.preload("/fountain-pen.glb");
