import React from "react";
import { useParams } from "react-router-dom";
import { Button, Card } from "flowbite-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

function ItemCard({location, name, scale}) {
    const { scene } = useGLTF(location);
    return (
      <Card className="max-w-sm">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {name} acquisitions 2021
        </h5>
        <Canvas>
            {/* Add some lighting */}
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
  
          < primitive object={scene}  position={[0, 0, 0]} scale={[ scale, scale, scale]} />
            {/* Add camera controls */}
          <OrbitControls enableZoom = {false}/>
        </Canvas>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        </p>
        <Button>
          Add to cart
        </Button>
      </Card>
    );
  }

export default function ItemsPage() {
    const { type } = useParams();
  return (
    <>
        <h1>{type}</h1>
        <Card className="max-w-sm">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <Canvas>
                
                  {/* Add some lighting */}
                  <ambientLight />
                  <pointLight position={[10, 10, 10]} />
                  
                  {/* Add camera controls */}
                  <OrbitControls />
                </Canvas>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
                <Button>
                  Add to cart
                </Button>
              </Card>
              <ItemCard name={"shoe"} location={"/shoe.glb"} scale={2.1}/>
              <ItemCard name={"pants"} location={"/pants.glb"} scale={4}/>
            
    </>
  );
}
