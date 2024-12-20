import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { TextInput, Navbar} from "flowbite-react";
import {HiSearch} from "react-icons/hi"
import ItemCard from "../assets/ItemsList/ItemCard";
import { NavbarComp } from "../assets/NavbarComp";
import { Mesh } from "three";

export default function ItemsPage() {
  const { type } = useParams();
  console.log(type);
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen">
        <NavbarComp currentLocation = {type}/>
        <Canvas fov={200}>
          <ambientLight/>
          <color attach="background" args={["#f0f0f0"]} />
          <Text  position={[0, 2, -10]} fontSize={5}>
            {type}
            <meshStandardMaterial color="black"/>
          </Text>
          <ItemCard position={[-5, 0, 0]} scale={[0.5, 0.5, 0.5]} name={"Item1"} price={"$100"} location={"/shoe.glb"}/>
          <ItemCard position={[0, 0, 0]} scale={[0.5, 0.5, 0.5]} name={"Item2"} price={"$100"} location={"/pants.glb"}/>
          <ItemCard position={[5, 0, 0]} scale={[0.5, 0.5, 0.5]} name={"Item3"} price={"$100"} location={"/Tshirt.glb"}/>

          <ItemCard position={[-5, 0, 6]} scale={[0.5, 0.5, 0.5]} name={"Item4"} price={"$100"} location={"/shoe.glb"}/>
          <ItemCard position={[0, 0, 6]} scale={[0.5, 0.5, 0.5]} name={"Item5"} price={"$100"} location={"/pants.glb"}/>
          <ItemCard position={[5, 0, 6]} scale={[0.5, 0.5, 0.5]} name={"Item6"} price={"$100"} location={"/Tshirt.glb"}/>
          <OrbitControls/>
        </Canvas>
      </div>  
    </>
  );
}
