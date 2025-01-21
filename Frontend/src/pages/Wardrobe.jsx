import React, { useEffect, useState } from "react";
import { NavbarComp } from "../assets/NavbarComp";
import { Accordion, Label } from "flowbite-react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Card, Spinner, Radio } from "flowbite-react";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import ClothingChoice from "../assets/ClothingChoice";

export default function Wardrobe() {
    const [ user, setUser ] = useState(null);
    const [ userloading, setUserLoading ] = useState(true);
    
    const [ cartItems, setCartItems] = useState([]);
    const [ cartLoading, setCartLoading] = useState(true);
    const [ cartError, setCartError] = useState(null);
    
    const [ inventory, setInventory] = useState([]);
    const [ inventoryLoading, setInventoryLoading] = useState(false);
    const [ inventoryError, setInventoryError] = useState(null);

    const [ clothing, setClothing] = useState({Top: "", Bottom: "", Shoe: ""});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user)=>{
            setUser(user);
            setUserLoading(false);
        });
        return unsubscribe;
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
        if(!user){
            console.warn("No userID found");
            return;
        }
        try{
            const userCollection = collection(db, "users");
            const userQuery = query(userCollection, where("userID", "==", user.uid));
            const userSnapshot = await getDocs(userQuery);
            if (userSnapshot.empty){
                console.warn(`No user found with userID: ${user.uid}`);
                return;
            }

            const userData = userSnapshot.docs[0].data();
            const cart = userData.cart || [];
            setCartItems(cart);
            if(cart.length === 0){
                console.warn("No cart items found");
                setCartLoading(false);
                return;
            }

            const itemsCollection = collection(db, "items");
            const itemsPromises = cart.map(async (itemID) => {
                const itemDocRef = doc(itemsCollection, itemID);
                const itemDoc = await getDoc(itemDocRef);
                if(itemDoc.exists()){
                    return {id: itemDoc.id, ...itemDoc.data()};
                } else{
                    console.warn(`No item found with ID: ${itemID}`);
                    return null;
                }
            });

            const fetchedItems = await Promise.all(itemsPromises);
            const filteredItems = fetchedItems.filter((item) => item !== null);
            setCartItems(filteredItems);
        } catch(error) {
            console.error("Error fetching cart items: ", error);
            setCartError(error.message);
        } finally{
            setCartLoading(false);
        }
    };

    const fetchInventoryItems = async () => {
        if(!user){
            console.warn("No userID found");
            return;
        }
        try{
            const userCollection = collection( db, "users");
            const userQuery = query(userCollection, where("userID", "==", user.uid));
            const userSnapshot = await getDocs(userQuery);
            if(userSnapshot.empty){
                console.warn(`No user found with userID: ${user.uid}`);
                return;
            }
            const userData = userSnapshot.docs[0].data();
            const inventory = userData.inventory || [];
            setInventory(inventory);
            if(inventory.length === 0){
                console.warn("No cart items found");
                setInventoryLoading(false);
                return;
            }

            const itemsCollection = collection(db, "items");
            const itemsPromises = inventory.map(async (itemID) => {
                const itemDocRef = doc(itemsCollection, itemID);
                const itemDoc = await getDoc(itemDocRef);
                if(itemDoc.exists()){
                    return {id: itemDoc.id, ...itemDoc.data()};
                } else{
                    console.warn(`No item found with ID: ${itemID}`);
                    return null;
                }
            });
            const fetchedItems = await Promise.all(itemsPromises);
            const filteredItems = fetchedItems.filter((item) => item !== null);
            setInventory(filteredItems);
        } catch (error){
            console.error("Error fetching cart items: ", error);
            setInventoryError(error.message);
        } finally{
            setInventoryLoading(false);
        }
    };

    fetchCartItems();
    fetchInventoryItems()
    }, [user]);

    const handleInputChange = (e) => {
        console.log(e.target.value);
        setClothing({...clothing, Shoe: e.target.value});
        console.log(clothing);
    };
  return (
    <>
        <NavbarComp/>
        <div className=" flex flex-col md:flex-row h-screen">
            <div className="md:w-1/4 p-4 md:overflow-y-auto">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">For your inventory</h2>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title>Tops</Accordion.Title>
                        <Accordion.Content>
                            {cartError && <h1 className="text-red-600 p-3 bg-red-200">{error}</h1>}
                            {(cartItems.length > 0 && !cartLoading && !cartError) && (
                            <fieldset className="flex max-w-md flex-col gap-4" onChange={(e) => setClothing({...clothing, Top: e.target.value})}>
                                <legend className="mb-4">Pick a top</legend>
                                {
                                    cartItems.filter((item) => item.type === "Tops").map((item, index) =>(
                                        <div className="flex items-center gap-2" key={index}>
                                            <Radio id = {item.id} name={item.name} value={item.mesh}/>
                                            <Label htmlFor = {item.id}>{ item.Name }</Label>                                     
                                        </div>
                                    ))
                                }
                            </fieldset>
                            )}
                            {(cartItems.length == 0 && !cartLoading && !cartError) && (
                                <div> nothing here</div>
                            )}
                            {(!cartError && cartLoading) && (
                                <Spinner/>
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Bottoms</Accordion.Title>
                        <Accordion.Content>
                        {cartError && <h1 className="text-red-600 p-3 bg-red-200">{error}</h1>}
                            {(cartItems.length > 0 && !cartLoading && !cartError) && (
                            <fieldset className="flex max-w-md flex-col gap-4" onChange={(e) => setClothing({...clothing, Bottom: e.target.value})}>
                                <legend className="mb-4">Pick a bottom</legend>
                                {
                                    cartItems.filter((item) => item.type === "Bottoms").map((item, index) =>(
                                        <div className="flex items-center gap-2" key={index}>
                                            <Radio id = {item.id} name={item.name} value={item.mesh}/>
                                            <Label htmlFor = {item.id}>{ item.Name }</Label>                                     
                                        </div>
                                    ))
                                }
                            </fieldset>
                            )}
                            {(cartItems.length == 0 && !cartLoading && !cartError) && (
                                <div> nothing here</div>
                            )}
                            {(!cartError && cartLoading) && (
                                <Spinner/>
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>shoes</Accordion.Title>
                        <Accordion.Content>
                        {cartError && <h1 className="text-red-600 p-3 bg-red-200">{error}</h1>}
                            {(cartItems.length > 0 && !cartLoading && !cartError) && (
                            <fieldset className="flex max-w-md flex-col gap-4" onChange={handleInputChange}>
                                <legend className="mb-4">Pick a pair of Shoes</legend>
                                {
                                    cartItems.filter((item) => item.type === "Shoes").map((item, index) =>(
                                        <div className="flex items-center gap-2" key={index}>
                                            <Radio id = {item.id} name={item.name} value={item.mesh}/>
                                            <Label htmlFor = {item.id}>{ item.Name }</Label>                                     
                                        </div>
                                    ))
                                }
                            </fieldset>
                            )}
                            {(cartItems.length == 0 && !cartLoading && !cartError) && (
                                <div> nothing here</div>
                            )}
                            {(!cartError && cartLoading) && (
                                <Spinner/>
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
            <div className="flex-grow p-4">
                <Canvas>
                    <ambientLight intensity={5}/>
                    <pointLight intensity={2}/>
                    <ClothingChoice choice={clothing}/>
                    <OrbitControls/>
                </Canvas>
            </div>
            <div className="xl:w-1/4 p-4 md:overflow-y-auto">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">For your cart</h2>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title>Tops</Accordion.Title>
                        <Accordion.Content>
                        {inventoryError && <h1 className="text-red-600 p-3 bg-red-200">{inventoryError}</h1>}
                            {(inventory.length > 0 && !inventoryLoading && !inventoryError) && (
                            <fieldset className="flex max-w-md flex-col gap-4" onChange={(e) => setClothing({...clothing, Top: e.target.value})}>
                                <legend className="mb-4">Pick a top</legend>
                                {
                                    inventory.filter((item) => item.type === "Tops").map((item, index) =>(
                                        <div className="flex items-center gap-2" key={index}>
                                            <Radio id = {item.id} name={item.name} value={item.mesh}/>
                                            <Label htmlFor = {item.id}>{ item.Name }</Label>                                     
                                        </div>
                                    ))
                                }
                            </fieldset>
                            )}
                            {(inventory.length == 0 && !inventoryLoading && !inventoryError) && (
                                <div> nothing here</div>
                            )}
                            {(!inventoryError && inventoryLoading) && (
                                <Spinner/>
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Bottoms</Accordion.Title>
                        <Accordion.Content>
                        {inventoryError && <h1 className="text-red-600 p-3 bg-red-200">{inventoryError}</h1>}
                            {(inventory.length > 0 && !inventoryLoading && !inventoryError) && (
                            <fieldset className="flex max-w-md flex-col gap-4" onChange={(e) => setClothing({...clothing, Bottom: e.target.value})}>
                                <legend className="mb-4">Pick a bottom</legend>
                                {
                                    inventory.filter((item) => item.type === "Bottoms").map((item, index) =>(
                                        <div className="flex items-center gap-2" key={index}>
                                            <Radio id = {item.id} name={item.name} value={item.mesh}/>
                                            <Label htmlFor = {item.id}>{ item.Name }</Label>                                     
                                        </div>
                                    ))
                                }
                            </fieldset>
                            )}
                            {(inventory.length == 0 && !inventoryLoading && !inventoryError) && (
                                <div> nothing here</div>
                            )}
                            {(!inventoryError && inventoryLoading) && (
                                <Spinner/>
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Shoes</Accordion.Title>
                        <Accordion.Content>
                        {inventoryError && <h1 className="text-red-600 p-3 bg-red-200">{inventoryError}</h1>}
                            {(inventory.length > 0 && !inventoryLoading && !inventoryError) && (
                            <fieldset className="flex max-w-md flex-col gap-4" onChange={(e) => setClothing({...clothing, Shoe: e.target.value})}>
                                <legend className="mb-4">Pick a pair of shoes</legend>
                                {
                                    inventory.filter((item) => item.type === "Shoes").map((item, index) =>(
                                        <div className="flex items-center gap-2" key={index}>
                                            <Radio id = {item.id} name={item.name} value={item.mesh}/>
                                            <Label htmlFor = {item.id}>{ item.Name }</Label>                                     
                                        </div>
                                    ))
                                }
                            </fieldset>
                            )}
                            {(inventory.length == 0 && !inventoryLoading && !inventoryError) && (
                                <div> nothing here</div>
                            )}
                            {(!inventoryError && inventoryLoading) && (
                                <Spinner/>
                            )}
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    </>
);
}
