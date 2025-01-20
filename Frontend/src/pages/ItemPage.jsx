import React from "react";
import { useParams } from "react-router-dom";
import { NavbarComp } from "../assets/NavbarComp";
import DisplayModel from "../assets/ItemPageAssets/DisplayModel";
import ItemDetails from "../assets/ItemPageAssets/ItemDetails";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState, useEffect } from "react";


export default function ItemPage() {
    const { id } = useParams();
    const itemRef = doc(db, "items", id);
    const [item, setItem] = useState({});
    console.log(id);
    useEffect(() => {
      const fetchItem = async () => {
        try {
          const docSnapshot = await getDoc(itemRef);
          if (docSnapshot.exists()) {
            console.log("Document data:", docSnapshot.data());
            setItem(docSnapshot.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching item:", error);
        }
      }

      fetchItem();
    },[])
  return (
    <>
      <div className="overflow-x-hidden">
        <NavbarComp/>
        {item.mesh? <div className="md:inline-flex h-[40rem] w-screen overflow-x-hidden md:scrollbar-hide gap-2 items-center m-2 justify-center">
          <DisplayModel location = {item.mesh}/>
          <ItemDetails details={item} itemID = {id}/>
        </div>
        :
        <div className="flex flex-row items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
        }
      </div>
    </>
  );
}
