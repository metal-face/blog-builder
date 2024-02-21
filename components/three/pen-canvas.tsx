"use client";

import { Canvas } from "@react-three/fiber";
import { FC, Suspense } from "react";
import { OrbitControls } from "@react-three/drei";
import RotatingPen from "@/components/three/rotating-pen.jsx";

const PenCanvas: FC = () => {
    return (
        <div className="h-1/2 w-full">
            <Canvas>
                <Suspense fallback={null}>
                    <RotatingPen />
                </Suspense>
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default PenCanvas;
