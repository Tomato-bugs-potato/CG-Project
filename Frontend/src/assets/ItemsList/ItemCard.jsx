import { Html } from "@react-three/drei";
import { Button } from "flowbite-react";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";

export default function ItemCard({ position, scale, name, price, location, scrollPosition, id }) {
  const { scene: originalScene } = useGLTF(location);
  const navigate = useNavigate();
  const groupRef = useRef();
  const modelRef = useRef();

  // Clone the scene to prevent caching conflicts
  const scene = originalScene.clone();

  useFrame(() => {
    if (groupRef.current) {
      scene.rotation.y += 0.005; // Rotate the model slowly
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        position[2] - scrollPosition,
        0.1 // Smoothing factor
      );

      // Update visibility based on distance
      const distance = Math.abs(groupRef.current.position.z);
      const isVisible = distance < 5.1;
      groupRef.current.visible = isVisible;
      if (modelRef.current) {
        modelRef.current.visible = isVisible;
      }
    }
  });

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.x = position[0];
      groupRef.current.position.y = position[1];
    }
  }, [position]);

  return (
    <group ref={groupRef}>
      {/* HTML content */}
      <Html position={[0, -1.5, 0]} scale={0.5} transform occlude>
        <div className="max-w-fit">
          <p className="max-w-full">{name}</p>
          <p>{price}</p>
        </div>
        <Button className="w-60" onClick={() => navigate(`/Item/${id}`)}>
          Add to cart
        </Button>
      </Html>

      {/* 3D Model */}
      <primitive ref={modelRef} object={scene} scale={scale} />
    </group>
  );
}
