import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, {useRef} from "react";
import { useGLTF } from "@react-three/drei";
import { use } from "react";

export default function DisplayModel({location}) {
    function Model({location}){
        const {scene} = useGLTF(location);
        const ref = useRef();
        useFrame(() => (
            scene.rotation.y += 0.01
        ));

        return(
            <primitive object={scene} scale={[1.5, 1.5, 1.5]}/>
        )
    }
    return (
        <>
            <Canvas
                style={
                    {
                        width: '30%',
                    }
                }
            >
                <color attach="background" args={["#f0f0f0"]} />
                <ambientLight intensity={2} />
                <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} castShadow />
                <pointLight position={[-10, 10, -10]} intensity={2} />
                <Model location = {location} position={[0, 0, 0]}/>
                <OrbitControls/>
            </Canvas>
        </>
    );
}
