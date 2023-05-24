import { useEffect, useState } from "react";
import "./Signup.css"
import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
export default function Signup(){
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user")){
            navigate()
        }
    },[]);
    const currentUser = useUserContext();
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [number, setNumber] = useState();
    const [password, setPassword] = useState();
    const signUpDone =  async ()=> {
         const userCreated = await fetch("http://localhost:4000/signup",{
            method : "post",
            body : JSON.stringify({name,email,number,password}),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const userParsed = await userCreated.json();
        localStorage.setItem("user", JSON.stringify(userParsed.userObject));
        localStorage.setItem("token", JSON.stringify(userParsed.token));
        currentUser.setUser(true);
        navigate("/");
    }
    return(
    <div className = "signup-form">
        <h1>Create an Account</h1>
        <div className = "signup-field">
            <label for = "name">Name</label>
            <input value = {name}type = "text" onChange={e=>setName(e.target.value)} placeholder = "Enter your Name" id = "name"/>
        </div>
        <div className = "signup-field">
            <label for = "email">Email</label>
            <input value = {email} type = "text" onChange={e=>setEmail(e.target.value)} placeholder = "Enter your Email" id = "email"/>
        </div>
        <div className = "signup-field">
            <label for = "phonenumber">Phone</label>
            <input value = {number} type = "text" onChange={e=>setNumber(e.target.value)} placeholder = "Enter your Phone Number" id = "phonenumber"/>
        </div>
        <div className = "signup-field">
            <label for = "pass-word">Password</label>
            <input value = {password} onChange={e=>setPassword(e.target.value)} type = "password" placeholder = "Enter your Password" id = "pass-word"/>
        </div>
        <button onClick  = {signUpDone} className = "signup-button">Sign Up</button>
    </div>
    )
}