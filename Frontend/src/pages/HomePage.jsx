import React from "react";
import { Canvas } from "@react-three/fiber";
import HeroCanvas from "../assets/HomePageAssets/HeroCanvas";
import { Environment, OrbitControls } from "@react-three/drei";
import * as THREE from 'three'
import Footing from '../assets/HomePageAssets/Footting'
export default function HomePage() {
    return (
        <>
            <div>
                <div className="fixed top-0 left-0 w-screen h-screen">
                    <Footing/>
                    <Canvas shadows camera={{ position: [0, 0, 0] }}>
                        <color attach="background" args={["#f0f0f0"]} />
                        <ambientLight intensity={1} />
                        <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} castShadow/>
                        <pointLight position={[-10, 10, -10]} intensity={2}/>
                        <HeroCanvas/>
                        {/* turn this off when you are working offline */}
                    </Canvas>
                </div>
            </div>
        </>
    );
}
