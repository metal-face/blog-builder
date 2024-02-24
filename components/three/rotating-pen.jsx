import React from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export default function RotatingPen(props) {
  const { nodes, materials, scene } = useGLTF("/Fountain_Pen.gltf 2");
  scene.add(new THREE.AmbientLight(0x666666, 2))
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
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top_Object01.geometry}
        material={materials.gold}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Top_Object03.geometry}
        material={materials.glossy_black}
      />
    </group>
  );
}

useGLTF.preload("/Fountain_Pen.gltf");
