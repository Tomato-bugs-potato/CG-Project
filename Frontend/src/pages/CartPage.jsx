import React, {useRef} from "react";
import { NavbarComp } from "../assets/NavbarComp";
import { Canvas, useFrame } from "@react-three/fiber";

import { useGLTF } from "@react-three/drei";
import { auth, db } from "../firebase/firebase";
import {useEffect, useState} from "react";
import { Card, Spinner } from "flowbite-react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import Remove from "../assets/Remove";
import Buy from "../assets/Buy";
export default function CartPage() {
  const [user, setUser] = useState(null);
  const [userloading, setuserLoading] = useState(true);

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const  [currentUser, setCurrentUser ] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setCurrentUser(user);
      setuserLoading(false);
    });
    return unsubscribe;
  }, []);
  
  useEffect(() => {
    const fetchCartItems = async () => {
      if(!currentUser){
        console.warn("No userID found");
        return;
      }
      try{
        const userCollection = collection(db, "users");
        const userQuery = query(userCollection, where("userID", "==", currentUser.uid));
        const userSnapshot = await getDocs(userQuery);
        if (userSnapshot.empty) {
          console.warn(`No user found with userID: ${currentUser.uid}`);
          return;
        }
        const userData = userSnapshot.docs[0].data();
        const cart = userData.cart || [];
        setCartItems(cart);
        if(cart.length===0){
          console.warn("No cart items found");
          setLoading(false);
          return;
        }
        
        const itemsCollection = collection(db, "items");
        const itemsPromises = cart.map(async (itemID) =>{
            const itemDocRef = doc(itemsCollection, itemID);
            const itemDoc = await getDoc(itemDocRef);
            if(itemDoc.exists()){
              return {id: itemDoc.id, ...itemDoc.data()};
            }else{
              console.warn(`No item found with ID: ${itemID}`);
              return null;
            }
        });
        const fetchedItems = await Promise.all(itemsPromises);
        const filteredItems = fetchedItems.filter((item) => item !== null);
        setCartItems(filteredItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [currentUser]);

  return (
    <div className="w-screen h-screen">
        <NavbarComp/>
        {userloading || !currentUser?(
          <div className="w-full h-4/5 flex flex-col justify-center items-center p-2 m-0">
            <Spinner className="xl"/>
          </div>
        ):(
          <>
            {error && <h1 className="text-red-600 p-3 bg-red-200">{error}</h1>}
            {(cartItems.length > 0 && !loading && !error) && (
              <>
                <div className="w-full h-4/5 flex flex-col justify-center items-center p-2 m-0">
                  <table className="w-fit m-3">
                    <thead className=" w-fit ">
                      <tr className=" py-10 inline-flex items-center justify-between w-full overflow-clip rounded-xl shadow-md bg-gray-400 text-white m-2 px-4">
                        <th className="w-fit">Item</th>
                        <th className="w-fit">Name</th>
                        <th className="w-fit">Price</th>
                        <th className="w-fit">Remove</th> 
                      </tr>
                    </thead>
                    <tbody className=" flex-col w-fit p-6">
                      {
                        cartItems.map((item, index)=>(<Displaycard key={index} data={item} setCartItems={setCartItems} cartItems={cartItems} userID={currentUser.uid}/>))
                      }
                    </tbody>
                  </table>    
                </div>
                <Buy userId={currentUser.uid} cartItems={cartItems} setCartItems={setCartItems} />
              </>
            )
            } 
            {(cartItems.length==0 && !loading && !error) && (
                <div className="flex w-full h-4/5 justify-center items-center">
                  <Card className="max-w-sm">
                    <div className="flex flex-row items-start justify-center gap-4">
                      <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                      </svg>
                      <div>
                        <h1 className = "text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Oops!</h1>
                        <p className="font-normal text-gray-700 dark:text-gray-400">There is nothing here.</p>
                        <p className="font-normal text-gray-700 dark:text-gray-400">Go shop around!!</p>
                      </div>
                    </div>
                  </Card>
                </div>
            )
            } 
          </>
        )
        }
    </div>
  );
}

function Displaycard({data, setCartItems, cartItems, userID}){
  function Model({location}){
          const {scene} = useGLTF(location);
          const ref = useRef();
          useFrame(() => (
              scene.rotation.y += 0.01
          ));
  
          return(
              <primitive object={scene} scale={[1.5, 1.5, 1.5]}/>
          )
      }
  return(
    <tr className=" inline-flex items-center justify-between w-full overflow-clip rounded-xl shadow-md bg-gray-100 m-2 px-4">
      <td>
        <div className = "w-[3rem] h-[5rem] py-2">
            <Canvas>
              <ambientLight intensity={10} />
              <Model location={data.mesh}/>
            </Canvas>
        </div>
      </td>
      <td className="w-fit text-left">{data.Name}</td>
      <td className="w-fit text-left">{`$${data.price}`}</td>
      <td className="w-fit text-left">
        <Remove userID={userID} itemID={data.id} setCartItems={setCartItems} cartItems={cartItems}/>
      </td>
    </tr>
  )
}
