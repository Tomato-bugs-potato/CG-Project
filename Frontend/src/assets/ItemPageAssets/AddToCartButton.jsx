import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase/firebase";
import { doc, getDoc, getDocs, updateDoc, arrayUnion, collection, query, where } from "firebase/firestore";
import { Button, Spinner } from "flowbite-react";


export default function AddToCartButton({itemID}) {
    const [ isLoading, setIsLoading] = useState(false);
    const [ error, setError ] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setUser(user);
        });
        return unsubscribe;
      }, []);

    const handleAddToCart = async () => {
        try{
            setIsLoading(true);
            if(!user){
                alert("Please sign in to add items to your cart");
                return;
            }

            const userCollection = collection(db, 'users');
            const userQuery = query(userCollection, where("userID", "==", user.uid));
            const userQuerySnapshot = await getDocs(userQuery);

            if( userQuerySnapshot.empty){
                console.log("Creating user documnet...");
                const newUserDocRef = doc(userCollection);
                await updateDoc(newUserDocRef, { userID: user.uid, inventory: [], cart: [itemID]});
                alert("Item added to cart!");
                return;
            }

            const userDoc = userQuerySnapshot.docs[0];
            const userDocRef = doc(db, 'users', userDoc.id);

            await updateDoc(userDocRef, {
                cart: arrayUnion(itemID)
            });

            alert("Item added to cart!");
        } catch (error) {
            setError(error);
            console.error("Error adding to cart:", error);
            alert("Error adding to cart. Please try again later\n"+error.message);
        } finally{
            setIsLoading(false);
        }
    };
    if(isLoading){
        return <Button disabled><Spinner/><span className='ml-1'>Adding to cart...</span></Button>;
    }
    if(error){
        return <Button onClick={handleAddToCart} className=" bg-red-900 text-white">Error: {error.message}</Button>;
    }
    return (
        <Button onClick={handleAddToCart}> Add to Cart</Button>
    );
}