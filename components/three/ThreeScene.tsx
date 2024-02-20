import { useRef, useEffect, FC } from "react";
import * as Three from "three";

const ThreeScene: FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const scene = new Three.Scene();
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
    }
  }, []);
  return <div ref={containerRef}></div>;
};

export default ThreeScene;
