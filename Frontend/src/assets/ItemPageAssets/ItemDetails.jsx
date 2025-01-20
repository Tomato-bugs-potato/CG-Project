import React, { useEffect, useState  } from "react";
import { Card, Button, Spinner } from "flowbite-react";
import { auth, db } from "../../firebase/firebase";
import { collection, query, where, getDoc, getDocs, doc } from "firebase/firestore";
import AddToCartButton from "./AddToCartButton";

export default function ItemDetails({details, itemID}) {
    const [ user, setUser ] = useState(null);
    const [userloading, setuserLoading] = useState(true);

    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            setCurrentUser(user);
            setuserLoading(false);
        });
        return unsubscribe;
    },[]);

    useEffect(() => {
        const fetchCartItems = async () => {
            if(!currentUser){
                console.warn("No userID found")
                return;
            }
            try{
                const userCollection = collection(db, "users");
                const userQuery = query (userCollection, where("userID", "==", currentUser.uid));
                const userSnapshot = await getDocs(userQuery);
                if(userSnapshot.empty){
                    console.warn(`No user found with userID: ${currentUser.uid}`);
                    return;
                }
                const userData = userSnapshot.docs[0].data();
                const cart = userData.cart || [];
                setCartItems(cart);
                
            } catch (error) {
                console.error("Error fetching cart items:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    },[currentUser]);


    
    return (
        <Card className="max-w-sm">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{details.Name}</h1>
            <p className="font-normal text-gray-700 dark:text-gray-400">{details.price}</p>
            <AddToCartButton itemID={itemID}/>
            {console.log(cartItems)}
            {console.log("item details:" + itemID)}
        </Card>
    );
}
