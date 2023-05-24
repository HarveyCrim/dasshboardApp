import { Navigate, useNavigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import "./Login.css"
import { useState } from "react";
export default function Login(){
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const currentUser = useUserContext()
    const navigate = useNavigate();
    const loginAttempt = async ()=> {
        const record = await fetch("http://localhost:4000/login",{
            method : "post",
            body : JSON.stringify({email,password}),
            headers : {
                "Content-Type" : "application/json"
            }
        });
        const recordParsed = await record.json();
        if(recordParsed.result){
            alert("No such User found");
        }
        else{
            localStorage.setItem("user", JSON.stringify(recordParsed.doc))
            localStorage.setItem("token", JSON.stringify(recordParsed.token))
            currentUser.setUser(true);
            navigate("/")
        }
    }
    return (
        <div className = "login-comp">
            <h1>Login</h1>
            <div className = "login-field">
                <label for = "email">Email</label>
                <input value = {email} onChange = {e=> setEmail(e.target.value)} id = "email" type = "text" placeholder = "Enter your Email"/>
            </div> 
            <div className = "login-field">
                <label for = "email">Password</label>
                <input value = {password} onChange = {e=> setPassword(e.target.value)} id = "email" type = "password" placeholder = "Enter your Password"/>
            </div>
            <button onClick = {loginAttempt} className = "login-button">Login</button>
        </div>
    )
}