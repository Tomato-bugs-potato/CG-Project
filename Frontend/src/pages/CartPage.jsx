import React, {useRef} from "react";
import { NavbarComp } from "../assets/NavbarComp";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { auth } from "../firebase/firebase";

export default function CartPage() {
  const x = [
    {
      name: "box",
      price:"12",
      quantity:"1",
      location: "/shoe.glb",
    },
    {
      name: "Tshirt",
      price:"12",
      quantity:"1",
      location: "/Tshirt.glb",
    },
    {
      name: "pants",
      price:"12",
      quantity:"1",
      location: "/pants.glb",
    },
    {
      name: "cargo pants",
      price:"12",
      quantity:"1",
      location: "/cargo_pants.glb",
    },
  ]
  return (
    <>
      <NavbarComp/>
        <h1>
            my cart {auth.currentUser?auth.currentUser.email:""} 
        </h1>
        <div className=" flex-col w-full p-6">
          {
            x.map((item)=>(<Displaycard data={item}/>))
          }
        </div>
        
    </>
  );
}

function Displaycard({data}){
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
  return(
    <div className=" inline-flex items-center justify-between w-full overflow-clip rounded-xl shadow-md bg-gray-100 m-2 px-4">
      <div className = "w-[5rem] h-[5rem] m-2">
          <Canvas>
            <Model location={data.location}/>
          </Canvas>
      </div>
      <h1>{data.name}</h1>
      <p>{data.quantity}</p>
      <p>{`$${data.price}`}</p>
    </div>
  )
}
