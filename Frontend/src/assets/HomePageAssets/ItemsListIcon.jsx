import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ItemsListIcon({location, href, position, scale}) {
    const navigate = useNavigate();
    let x;
    function Model({scale}){
        const {scene} = useGLTF(location);
        return <primitive object={scene} scale={scale}/>;
    }
    return (
        <group onClick={()=>{navigate(href)}} position={position}>
            <Model position={[0, 0, 0]} scale = {scale}/>
        </group>
    );
}
