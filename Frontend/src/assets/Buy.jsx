import { Button , Spinner} from "flowbite-react";
import React, {useState, useEffect} from "react";
import { db } from "../firebase/firebase";
import { collection, query, where, getDoc, getDocs, doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";

export default function Buy({ userId, cartItems, setCartItems }) {
    const [ isLoading, setIsLoading] = useState(false);
    const [ error, setError] = useState();
    
    const buyItems = async () => {
        try{
            setIsLoading(true);
            if(cartItems.length === 0){
                alert("Your cart is empty!");
                return;
            }

            const userCollection = collection(db, 'users');
            const userQuery = query(userCollection, where("userID", "==", userId));
            const userQuerySnapshot = await getDocs(userQuery);

            if(userQuerySnapshot.empty){
                throw new Error("No user documnet found.");
            }

            const userDoc = userQuerySnapshot.docs[0];
            const userDocRef = doc(db, 'users', userDoc.id);

            const itemIdsToMove = cartItems.map(item => item.id);
            await updateDoc(userDocRef,{
                cart: arrayRemove(...itemIdsToMove),
                inventory:arrayUnion(...itemIdsToMove)
            });

            setCartItems([]);
            alert("Items purchased successfully!");
        } catch(error){
            setError(error);
            console.error("Error purchasing items:", error);
        } finally{
            setIsLoading(false);
        }
    };
    if(isLoading){
        return(
            <button className="w-fit h-fit p-2 rounded-md flex flex-row items-center justify-center mx-3 bg-gray-400 text-gray-700 hover:bg-black hover:text-white" disabled>
                <Spinner/>
                <span className="ml-1">purchasing...</span>
            </button>
        );
    }
    if(error){
        <button className="w-fit h-fit p-2 rounded-md flex flex-row items-center justify-center mx-3 bg-red-900 text-white hover:bg-red-500 hover:text-white" onClick={() => buyItems()}>
            {error.message}
        </button>
    }
  return(
    <button className="w-fit h-fit p-2 rounded-md flex flex-row items-center justify-center mx-3 bg-gray-400 text-gray-700 hover:bg-black hover:text-white" onClick={() => buyItems()}>
        <svg className="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"/>
        </svg>
        <span className="ml-1">Buy</span>
    </button>);
}
