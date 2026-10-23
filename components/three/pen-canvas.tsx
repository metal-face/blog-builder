"use client";

import { Float, OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { type FC, Suspense, useState } from "react";
import { FountainPen } from "@/components/three/fountain-pen";
import { createInk, Ink, PenWriter, usePenKeys } from "@/components/three/pen-writing";

const PenCanvas: FC = () => {
    const { positioned: writing, inking } = usePenKeys();
    const [ink] = useState(createInk);

    return (
        <div
            id="canvas-container"
            className="h-5/6 w-full"
            role={"img"}
            aria-label={"A rotating fountain pen"}
        >
            <Canvas
                shadows
                dpr={[1, 1.5]}
                gl={{ toneMappingExposure: 1.1 }}
                camera={{ position: [80, 200, 200], fov: 40 }}
            >
                <Suspense fallback={null}>
                    <Stage
                        intensity={4}
                        preset={"rembrandt"}
                        shadows={"contact"}
                        adjustCamera
                        environment={{ preset: "park", environmentIntensity: 1.2 }}
                    >
                        <Float
                            enabled={!writing}
                            speed={1.5}
                            rotationIntensity={0.3}
                            floatIntensity={2}
                            floatingRange={[-0.4, 0.4]}
                        >
                            <PenWriter writing={writing} inking={inking} ink={ink}>
                                <FountainPen />
                            </PenWriter>
                        </Float>
                    </Stage>
                    <Ink writing={writing} ink={ink} />
                </Suspense>
                <OrbitControls
                    enabled={!writing}
                    autoRotate={!writing}
                    enableZoom={false}
                    enableRotate
                    enablePan
                    enableDamping
                    autoRotateSpeed={1.5}
                />
            </Canvas>
        </div>
    );
};

export default PenCanvas;
