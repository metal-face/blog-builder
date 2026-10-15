"use client";

import { A11y, A11yAnnouncer } from "@react-three/a11y";
import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type FC, Suspense, useRef } from "react";
import { RotatingPen } from "@/components/three/rotating-pen";

const PenCanvas: FC = () => {
    const ref = useRef();

    return (
        <div id="canvas-container" className="h-5/6 w-full">
            <Canvas
                gl={{ preserveDrawingBuffer: true }}
                shadows
                dpr={[1, 1.5]}
                camera={{
                    position: [50, 200, 150],
                    near: 0,
                    far: 100,
                    fov: 50,
                    zoom: 1,
                }}
            >
                <Suspense fallback={null}>
                    <Stage
                        intensity={23}
                        shadows
                        castShadow
                        receiveShadow
                        adjustCamera
                        environment={"park"}
                    >
                        <A11y role="content" description="A rotating fountain pen">
                            <RotatingPen />
                        </A11y>
                    </Stage>
                </Suspense>
                <OrbitControls
                    ref={ref.current}
                    autoRotate
                    enableZoom={false}
                    enableRotate
                    enablePan
                    enableDamping
                    autoRotateSpeed={1.5}
                />
            </Canvas>
            <A11yAnnouncer />
        </div>
    );
};

export default PenCanvas;
