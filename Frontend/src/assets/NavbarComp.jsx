import { TextInput, Navbar} from "flowbite-react";
import {HiSearch} from "react-icons/hi"
import { auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import SeachResult from "./SeachResult";
export function NavbarComp({currentLocation}) {
  const [searched, setSearched] = useState("");
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">:Name_</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <TextInput icon={HiSearch} placeholder="Search" onChange={(e) => setSearched(e.target.value)}/>
        <SeachResult searched={searched}/>
        <Navbar.Toggle />
      </div>
      <div>
          
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/List/Tops" active={currentLocation === "Tops"}>
          Tops
        </Navbar.Link>
        <Navbar.Link href="/List/Bottoms" active={currentLocation === "Bottoms"}>Bottoms</Navbar.Link>
        <Navbar.Link href="/List/Shoes" active={currentLocation === "Shoes"}>Shoes</Navbar.Link>
            <Navbar.Link href="/my_cart">my cart</Navbar.Link>
            <Navbar.Link href="/wardrobe">wardrobe</Navbar.Link>
            {auth.currentUser?<Navbar.Link href="/signout">Sign out</Navbar.Link>:<Navbar.Link href="/auth">Sign in</Navbar.Link>}
      </Navbar.Collapse>
    </Navbar>
  );
}