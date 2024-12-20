import React, { useRef } from "react";
import * as THREE from 'three'
import { useFrame } from "@react-three/fiber";
import { ScrollControls, Scroll, useScroll, Center, AccumulativeShadows, RandomizedLight, Text, Html } from "@react-three/drei";
import Footting from "./Footting"
import ItemsListIcon from "./ItemsListIcon";

function HeroCanvas() {
  return (
    <>
    <ScrollControls pages={2} damping={0.1}>
      <Scroll>
        {/* Camera will zoom out as this content is revealed */}
        <CameraMovement/>
        <Content/>
      </Scroll>
    </ScrollControls>
    </>
  );
}

function CameraMovement() {
    const scroll = useScroll();
    //const cameraRef = useRef();

    useFrame((state) => {
            const scrollY = scroll.offset;
            state.camera.position.z = 5 + scrollY * 10;
        }
    );
    return null;
}

function Content3D() {
  return (
    <>
      {/* Section 1 */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>

      {/* Section 2 */}
      <mesh position={[0, 0, 5]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial color="blue" />
      </mesh>

      {/* Section 3 */}
      <mesh position={[0, 0, 9]}>
        <coneGeometry args={[1, 2, 32]} />
        <meshStandardMaterial color="green" />
      </mesh>
    </>
  );
}

function Sphere(props) {
    return(
        <mesh {...props} castShadow receiveShadow>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial/>
        </mesh>
    )
}
function Content(){
  return (
    <group position={[0, -1, 4]}>
        <Sphere scale={0.25} position={[-3, 0, 2]}/>
        <Sphere scale={0.25} position={[-4, 0, -2]}/>
        <Sphere scale={0.25} position={[3.5, 0, -2]}/>
        <Text position={[0, 2, -10]} fontSize={5}>
            :Name_
            <meshStandardMaterial color="black"/>
        </Text>
        <ItemsListIcon location={"/Tshirt.glb"} href={"List/Tops"} position={[-2, 0, 2]} scale={[0.7, 0.7, 0.7]}/> 
        <ItemsListIcon location={"/pants.glb"} href={"List/Bottoms"} position={[2, 0, 2]} scale={[1, 1, 1]}/>
        <ItemsListIcon location={"/shoe.glb"} href={"List/Shoes"} position={[0, 0, 6]} scale={[0.5, 0.5, 0.5]}/>
        
    </group>
  );
}

function StaticBackground() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="lightblue" />
      </mesh>
    </>
  );
}

export default HeroCanvas;
