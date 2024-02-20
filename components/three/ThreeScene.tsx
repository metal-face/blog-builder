"use client";

import { useRef, useEffect, FC } from "react";
import * as Three from "three";

const ThreeScene: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new Three.Scene();
      const geometry = new Three.BoxGeometry();
      const material = new Three.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new Three.Mesh(geometry, material);
      scene.add(cube);

      const camera = new Three.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      const renderer = new Three.WebGLRenderer();

      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z = 5;

      const renderScene = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      const handleResize = () => {
        const width = window.innerHeight;
        const height = window.innerWidth;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
      };

      renderScene();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return <div ref={containerRef} />;
};

export default ThreeScene;
