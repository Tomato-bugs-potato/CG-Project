import { TextInput, Navbar} from "flowbite-react";
import {HiSearch} from "react-icons/hi"
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import SeachResult from "./SeachResult";
import { Spinner } from "flowbite-react";
export function NavbarComp({currentLocation}) {
  const [searched, setSearched] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/" className="text-inherit">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">:Name_</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <TextInput icon={HiSearch} placeholder="Search" onChange={(e) => setSearched(e.target.value)}/>
        <SeachResult searched={searched}/>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse className="text-inherit">
        <Navbar.Link href="/List/Tops" active={currentLocation === "Tops"} className="text-inherit">
          Tops
        </Navbar.Link>
        <Navbar.Link href="/List/Bottoms" active={currentLocation === "Bottoms"}>Bottoms</Navbar.Link>
        <Navbar.Link href="/List/Shoes" active={currentLocation === "Shoes"}>Shoes</Navbar.Link>
        {loading?
          <Spinner/>:
          user?
          <>
            <Navbar.Link href="/my_cart" active={currentLocation === "my_cart"}>my cart</Navbar.Link>
            <Navbar.Link href="/wardrobe" active={currentLocation === "Wardrobe"}>wardrobe</Navbar.Link>
            <Navbar.Link href="/sign">Sign out</Navbar.Link>
          </>:
          <Navbar.Link href="/auth">Sign in</Navbar.Link>
        }
      </Navbar.Collapse>
    </Navbar>
  );
}