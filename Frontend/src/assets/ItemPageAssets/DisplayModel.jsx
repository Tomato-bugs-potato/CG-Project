import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import React, {useRef} from "react";
import { useGLTF } from "@react-three/drei";
import { useState } from "react";
import { useEffect } from "react";

export default function DisplayModel({location}) {
    const [canvaStyle, setCanvasStyle] = useState({
        width:"100%",
    })
    useEffect(() => {
        const handleResize = () => {
            setCanvasStyle({
                width: window.innerWidth >= 768? "30%" : "100%",
            })
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        }
    },[])
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
                    canvaStyle
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
