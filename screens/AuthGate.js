import React,{useContext,useState} from "react";
import { AuthContext } from "../context/AuthContext";
import Login from "./Login";
import Register from "./Register";

export default function AuthGate({ children }) {
 const { user } = useContext(AuthContext);
 const [mode,setMode] = useState("login"); // login | register

 if(!user){
   return mode==="login"
     ? <Login goRegister={()=>setMode("register")}/>
     : <Register goLogin={()=>setMode("login")}/>
 }

 return children;
}
