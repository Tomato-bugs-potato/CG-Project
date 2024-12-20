import React from "react";
import { useParams } from "react-router-dom";
import { NavbarComp } from "../assets/NavbarComp";
import DisplayModel from "../assets/ItemPageAssets/DisplayModel";
import ItemDetails from "../assets/ItemPageAssets/ItemDetails";



export default function ItemPage() {
    const { id } = useParams();
    function Model(){
      return
    }
  return (
    <>
      <div className="overflow-x-hidden">
        <NavbarComp/>
        <div className="inline-flex h-[40rem] w-screen overflow-x-hidden scrollbar-hide gap-2 items-center m-2 justify-center">
          <DisplayModel location = {"/Tshirt.glb"}/>
          <ItemDetails/>
        </div>
      </div>
    </>
  );
}
