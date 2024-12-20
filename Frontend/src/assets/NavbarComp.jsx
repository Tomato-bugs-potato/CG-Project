import { TextInput, Navbar} from "flowbite-react";
import {HiSearch} from "react-icons/hi"
export function NavbarComp({currentLocation}) {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">:Name_</span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <TextInput icon={HiSearch} placeholder="Search" />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/List/Tops" active={currentLocation === "Tops"}>
          Tops
        </Navbar.Link>
        <Navbar.Link href="/List/Bottoms" active={currentLocation === "Bottoms"}>Bottoms</Navbar.Link>
        <Navbar.Link href="/List/Shoes" active={currentLocation === "Shoes"}>Shoes</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}