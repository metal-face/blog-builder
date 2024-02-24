import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
    nodes: {
        Body_body_pen01: THREE.Mesh;
        Body_body_pen_part_01: THREE.Mesh;
        Body_body_pen_part_02: THREE.Mesh;
        Body_body_pen_part_04: THREE.Mesh;
        Top_Object01: THREE.Mesh;
        Top_Object03: THREE.Mesh;
    };
    materials: {
        glossy_black: THREE.MeshPhysicalMaterial;
        gold: THREE.MeshPhysicalMaterial;
        chrome: THREE.MeshPhysicalMaterial;
        mat_black: THREE.MeshPhysicalMaterial;
    };
};

export function RotatingPen(props: JSX.IntrinsicElements["group"]) {
    const { nodes, materials } = useGLTF("/Fountain_Pen.gltf 2") as GLTFResult;
    return (
        <group {...props} dispose={null}>
            <mesh
                name="Body_body_pen01"
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen01.geometry}
                material={materials.glossy_black}
            />
            <mesh
                name="Body_body_pen_part_01"
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen_part_01.geometry}
                material={materials.gold}
            />
            <mesh
                name="Body_body_pen_part_02"
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen_part_02.geometry}
                material={materials.chrome}
            />
            <mesh
                name="Body_body_pen_part_04"
                castShadow
                receiveShadow
                geometry={nodes.Body_body_pen_part_04.geometry}
                material={materials.mat_black}
            />
            <mesh
                name="Top_Object01"
                castShadow
                receiveShadow
                geometry={nodes.Top_Object01.geometry}
                material={materials.gold}
            />
            <mesh
                name="Top_Object03"
                castShadow
                receiveShadow
                geometry={nodes.Top_Object03.geometry}
                material={materials.glossy_black}
            />
        </group>
    );
}

useGLTF.preload("/Fountain_Pen.gltf 2");
