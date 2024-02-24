"use client";

import { Canvas } from "@react-three/fiber";
import { FC, Suspense, useRef } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import { RotatingPen } from "@/components/three/rotating-pen";

const PenCanvas = () => {
    const ref = useRef();

    return (
        <div className="h-1/2 w-full">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                shadows
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 150], fov: 50 }}
            >
                <Suspense fallback={null}>
                    <Stage
                        intensity={10}
                        castShadow={true}
                        shadows
                        adjustCamera
                    >
                        <RotatingPen />
                    </Stage>
                </Suspense>
                <OrbitControls ref={ref} autoRotate={true} />
            </Canvas>
        </div>
    );
};

export default PenCanvas;
