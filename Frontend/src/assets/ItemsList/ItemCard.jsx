import { Html } from "@react-three/drei";
import { Button } from "flowbite-react";
import React, {useRef, useState} from "react";
import {events, useFrame} from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

export default function ItemCard({position, scale, name, price, location}) {
    function Model(){
        const { scene } = useGLTF(location);
        useFrame(()=>{
            scene.rotation.y += 0.005;
        })
        return <primitive object={scene} />
    }
    const navigate = useNavigate();
    const ref = useRef();
    const [zPosition, setZPosition] = useState(0);
    const handlewheel = (event) => {
        setZPosition((prev) => prev + event.deltaY*0.01);
    }
    return (
        <group position={[position[0], position[1], position[2]+zPosition]}>
            {
            (position[2] + zPosition >= 0) &&
            (<>
            <Html position={[0, -1.5, 0]} scale={0.5} transform>
                <div className="max-w-fit">
                    <p className="max-w-full">{name}</p>
                    <p>{price}</p>
                </div>
                <Button className="w-60" onClick={()=>{navigate(`/Item/${name}`)}}>Add to cart</Button>
            </Html>
            <Model scale={scale} position={[0, 0, 0]}/>
            </>)
        }
        </group>
    );
}


