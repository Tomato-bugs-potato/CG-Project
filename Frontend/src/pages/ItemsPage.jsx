import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import ItemCard from "../assets/ItemsList/ItemCard";
import { NavbarComp } from "../assets/NavbarComp";
import { db } from "../firebase/firebase";
import { getDocs, collection } from "firebase/firestore";
import LodingItemCard from "../assets/ItemsList/LodingItemCard";

function Scene({ scrollPosition }) {
  const [ItemsList, setItemsList] = useState([]);
  const ItemsCollectionRef = collection(db, "items");

  // Fetch items from the database
  useEffect(() => {
    const getItems = async () => {
      try {
        const data = await getDocs(ItemsCollectionRef);
        const filteredData = data.docs.map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(filteredData);
        setItemsList(filteredData);
      } catch (error) {
        console.error(error);
      }
    };
    getItems();
  }, []);

  const filteredItems = ItemsList.filter(
    (item) => item.type === useParams().type
  );

  const renderItems = () => {
    let inc = 0;
    return filteredItems.map((item, i) => {
      let position;
      if(window.innerWidth > 768){
        if (i % 3 === 0) {
          position = [-5, 0, inc];
        } else if (i % 3 === 1) {
          position = [0, 0, inc];
        } else {
          position = [5, 0, inc];
          inc += 6;
        }
      }
      else{
        position = [0 , 0, inc];
        inc += 6;
      }
      return (
        <>
        {console.log(item.id)}
        <ItemCard
          key={item.id}
          id={item.id}
          position={position}
          scale={[2, 2, 2]}
          name={item.Name}
          price={item.price}
          location={item.mesh}
          scrollPosition={scrollPosition}
        />
        </>
      );
    });
  };

  return (
    <>

      <ambientLight intensity={6} />
      <mesh position={[0, -1, -5.1]} visible={false}>
        <planeGeometry args={[20, 3]} />
        <meshStandardMaterial />
      </mesh>
      {
        window.innerWidth > 768?
        (<Text position={[0, 2, -10]} fontSize={5}>
          {useParams().type}
          <meshStandardMaterial color="black" />
        </Text>)
        :
        (<Text position={[0, 2, -15]} fontSize={5}>
          {useParams().type}
          <meshStandardMaterial color="black" />
        </Text>)
      }
      {filteredItems.length > 0 ? (
        renderItems()
      ) : (
        <>
          <LodingItemCard position={[-5, 0, 0]} />
          <LodingItemCard position={[0, 0, 0]} />
          <LodingItemCard position={[5, 0, 0]} />
        </>
      )}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        minAzimuthAngle={0}
        maxAzimuthAngle={0}
      />
    </>
  );
}


export default function ItemsPage() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const { type } = useParams();

  const handleWheel = useCallback((event) => {
    setScrollPosition((prev) => {
      const newPosition = prev + event.deltaY * 0.01;
      return Math.max(0, newPosition); // Prevent scrolling into negative values
    });
  }, []);

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen" onWheel={handleWheel}>
        <NavbarComp currentLocation={type} />
        <Canvas fov={75}>
          <color attach="background" args={["#f0f0f0"]} />
          <Scene scrollPosition={scrollPosition} />
        </Canvas>
      </div>
    </>
  );
}
