"use client";

import { Canvas } from "@react-three/fiber";
import { FC, Suspense, useRef } from "react";
import { OrbitControls, Stage } from "@react-three/drei";
import RotatingPen from "@/components/three/rotating-pen.jsx";

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
                <ambientLight intensity={0.25} />
                <Suspense fallback={null}>
                    <Stage
                        controls={ref}
                        intensity={{
                            value: 1,
                            min: 0,
                            max: 2,
                            step: 0.1,
                            label: "light intensity",
                        }}
                        contactShadow={true}
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
