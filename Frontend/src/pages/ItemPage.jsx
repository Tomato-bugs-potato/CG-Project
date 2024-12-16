import React from "react";
import { useParams } from "react-router-dom";
export default function ItemPage() {
    const { id } = useParams();
  return (
    <>
       <h1>{id}</h1>
    </>
  );
}
