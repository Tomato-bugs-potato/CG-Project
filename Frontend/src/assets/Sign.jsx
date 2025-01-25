import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebase";
import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import {Button, TextInput} from "flowbite-react"
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineLockClosed } from "react-icons/hi";
import LoginImg from "./login.avif"
import bg from "./LoginImageBackdroup.jpg"

export default function Sign() {
    const navigate = useNavigate();
    const [ error, setError] = useState();

    const signIn = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (e) {
            console.log(e);
            setError(e);
        }
    }

    const singInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
        } catch (e) {
            console.log(e);
            setError(e);
        }
    }
   function LoginCard(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    function handleLogin(event){
        event.preventDefault();
        signIn(email, password);
    }
       return(
           <div className="flex flex-row items-center justify-center fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
               <form className="bg-white p-8 rounded-lg shadow-md w-96">
                   <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Hello there!</h2>
                   <div className="mb-4">
                   <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                   {error && (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found')?
                        <TextInput 
                            icon={HiOutlineUser}  
                            placeholder="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            color="failure"    
                            helperText={
                                <p className="font-medium text-center items-center">{error.message}</p>
                            }
                        />:
                        <TextInput 
                            icon={HiOutlineUser}  
                            placeholder="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            required    
                        />
                    }
                    </div>
                    <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                    {error && (error.code === "auth/wrong-password" || error.code === "auth/missing-password")?
                        <TextInput 
                            icon={HiOutlineLockClosed} 
                            type="password" 
                            value={password} 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            color="failure"
                            helperText={
                                <p className="font-medium text-center items-center">{error.message}</p>
                            }
                        />:
                        <TextInput 
                            icon={HiOutlineLockClosed} 
                            type="password" 
                            value={password} 
                            placeholder="password" 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    }
                    </div>
                   <Button type="submit" className="bg-violet-600 shadow-xl w-full focus:outline-none focus:ring-0 mb-2" onClick={handleLogin}>Sign in</Button>
                   <button 
                        onClick={singInWithGoogle} 
                        className="flex flex-row items-center justify-center gap-3 rounded-md text-sm font-medium text-gray-600 hover:text-white border border-gray-300 hover:bg-gray-500 focus:outline-none focus:ring-0 p-2 w-full"
                    >
                       <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z" clip-rule="evenodd"/>
                       </svg>
                       Sign in with Google                    
                   </button>
                   <p className="mt-4 text-center text-sm text-gray-600">already have an account? <a className="text-violet-600" href="/auth">sign up</a></p>
               </form>
               
           </div>
       )
   }

   return(
       <div className="h-screen w-screen">
           {/*a full screen image background */}
           <img src={bg} alt="background" className="fixed top-0 left-0 w-screen h-screen object-cover"/>
           {/*low opacity background*/}
           <div className="fixed top-0 left-0 w-screen h-screen bg-black opacity-30"></div>
           <LoginCard/>
       </div>
   );
}
