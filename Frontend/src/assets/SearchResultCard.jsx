import { Canvas, useFrame } from "@react-three/fiber";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { Html } from "@react-three/drei";

export default function SearchResultCard({ item }) {
    
   function Model(){
          const {scene} = useGLTF(item.mesh);
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
        {item &&
            (<div onClick={() => window.location.href = `/item/${item.id}`}  className="w-[20rem] h-[20rem] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Canvas>
                    <Model/>
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} />
                    <Html position={[0, -2, 0]} transform>
                        <div className="p-5">
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.Name}</h5>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.price}</p>
                        </div>
                    </Html>
                </Canvas>
            </div>)
        }
    </>
    );
}
