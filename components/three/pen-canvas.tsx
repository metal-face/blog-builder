"use client";

import { Canvas } from "@react-three/fiber";
import { FC, Suspense, useRef } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { RotatingPen } from "@/components/three/rotating-pen";
import { Camera } from "three";

const PenCanvas = () => {
    const ref = useRef();

    return (
        <div className="h-1/2 w-full">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                shadows
                dpr={[1, 1.5]}
                camera={{
                    position: [0, 0, 150],
                    near: 0.1,
                    far: 1000,
                    fov: 50,
                }}
            >
                <Suspense fallback={null}>
                    <Stage intensity={15} castShadow shadows adjustCamera>
                        <RotatingPen />
                    </Stage>
                </Suspense>
                <OrbitControls
                    ref={ref.current}
                    autoRotate
                    enableZoom={false}
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    );
};

export default PenCanvas;
