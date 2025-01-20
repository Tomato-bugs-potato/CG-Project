import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDocs, doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

export default function Remove({itemID, userID, setCartItems, cartItems}) {
    const [ isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState();

    const removeFromCart = async(itemID) => {
        try{
            setIsLoading(true);

            const userCollection = collection(db, "users");
            const userQuery = query( userCollection, where("userID", "==", userID));
            const userQuerySnapshot = await getDocs(userQuery);

            if(userQuerySnapshot.empty){
                throw new Error("No user document found.");
            }

            const userDoc = userQuerySnapshot.docs[0];
            const userDocRef = doc(db, 'users', userDoc.id);

            await updateDoc(userDocRef, {
                cart: arrayRemove(itemID)
            });

            setCartItems(cartItems.filter(item => item.id !== itemID));
        } catch (error){
            setError(error);
            console.error("Error removing from cart:", error);
        } finally{
            setIsLoading(false);
        }
    }

    if(isLoading) return <Button disabled className="bg-red-500"><Spinner/><span className="ml-1">remove...</span></Button>
    if(error) return <Button onClick={() => removeFromCart(itemID)} className="bg-red-900 text-white">Error: {error.message}</Button>
    return (
        <button className="  flex flex-row items-center justify-center text-gray-800 hover:text-white w-fit h-fit p-2 rounded-md hover:bg-red-900 mx-7" onClick={() => removeFromCart(itemID)}>
            <svg className="w-6 h-6  " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
        </button>
    );
}
