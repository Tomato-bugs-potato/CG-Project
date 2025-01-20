import { Button, MegaMenu, Navbar, Dropdown } from 'flowbite-react';
import { auth } from '../firebase/firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { Spinner } from 'flowbite-react';

export default function Header() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  return (
    <MegaMenu>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 md:space-x-8">
        <Navbar.Brand href="/">
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">:Name_</span>
        </Navbar.Brand>
        <div className="order-2 hidden items-center md:flex">
          {
            user?   
            <Dropdown label={auth.currentUser.email} inline>
                <Dropdown.Item>wardrobe</Dropdown.Item>
                <Dropdown.Item>my cart</Dropdown.Item>
                <Dropdown.Item onClick={
                    async () => {
                        try{
                            await signOut(auth);
                            window.location.reload()
                        }
                        catch(e){
                            console.log(e);
                        }
                    }
                }>
                Sign out</Dropdown.Item>
            </Dropdown>
            :
            (<><a
            href="/sign"
            className="mr-1 rounded-lg px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800 md:mr-2 md:px-5 md:py-2.5"
          >
            Login
          </a>
          <Button href="/auth">Sign up</Button></>)}
        </div>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link>
            <MegaMenu.Dropdown toggle={<>Company</>}>
              <ul className="grid grid-cols-3">
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      About Us
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Contact Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      Terms
                    </a>
                  </li>
                </div>
                <div className="space-y-4 p-4">
                  <li>
                    <a href="#" className="hover:text-primary-600 dark:hover:text-primary-500">
                      License
                    </a>
                  </li>
                </div>
              </ul>
            </MegaMenu.Dropdown>
          </Navbar.Link>
          <Navbar.Link href="#">Contact</Navbar.Link>
        </Navbar.Collapse>
      </div>
    </MegaMenu>
  );
}
