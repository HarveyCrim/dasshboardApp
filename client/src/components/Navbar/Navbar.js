import { Link, Navigate, useNavigate } from "react-router-dom"
import "./Navbar.css"
import { useUserContext } from "../../UserContext"
import { useEffect } from "react";
export default function Navbar(){
    const currentUser = useUserContext();
    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("user")){
            currentUser.setUser(true);
        }
    },[])
    const logoutAction = ()=> {
        localStorage.clear();
        currentUser.setUser(false);
        navigate("/signup");
    }
    return (
             currentUser.user ? <div className = "signedin-nav">
                <img id = "logo-nav" src =  "https://upload.wikimedia.org/wikipedia/commons/3/33/Cartoon_space_rocket.png" alt = ""/>
                <ul className = "navbar-list1">
                    <li><Link className = "remove-underline" to = "/" >Products</Link></li>
                    <li><Link className = "remove-underline" to = "/add" >Add a Product</Link></li>
                    <li><Link className = "remove-underline" to = "/profile" >Profile</Link></li>
                </ul>
                <span onClick = {logoutAction} className = "logout-span">Logout : {JSON.parse(localStorage.getItem("user")).name}</span>
            </div>
            : 
             <div className = "signup-nav">
             <img id = "logo-nav" src = "https://upload.wikimedia.org/wikipedia/commons/3/33/Cartoon_space_rocket.png" alt = ""/>
                <ul className = "navbar-list2">
                    <li><Link className = "remove-underline" to = "/signup" >Sign Up</Link></li>
                    <li><Link className = "remove-underline" to = "/login" >Login</Link></li>
                </ul>
            </div> 
            
            
        
    )
}