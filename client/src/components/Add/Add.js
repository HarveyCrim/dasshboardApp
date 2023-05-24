import { useState } from "react";
import "./Add.css"
import { useNavigate } from "react-router-dom";
export default function Add(){
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    const addProduct = async ()=>{
        const userid = JSON.parse(localStorage.getItem("user"))._id;
        const doc = await fetch("http://localhost:4000/add-product", {
            method : "post",
            body : JSON.stringify({userid,name,price,category,company}),
            headers: {
                "Content-Type" : "application/json",
                "Authorization" : JSON.parse(localStorage.getItem("token"))
            }
        })
        const docParsed = await doc.json()
        alert("Product added successfully")
        navigate("/")
    }
    return(
        <div className = "add-comp">
            <h1>Add a Product</h1>
            <div className = "product-field">
                <label for = "name">Name</label>
                <input value = {name} onChange = {e=> setName(e.target.value)} id = "name" type = "text" placeholder = "Enter product name" />
            </div>
            <div className = "product-field">
                <label for = "price">Price</label>
                <input  value = {price} onChange = {e=> setPrice(e.target.value)}  id = "price" type = "text" placeholder = "Enter product price" />
            </div>
            <div className = "product-field">
                <label for = "category">Category</label>
                <input  value = {category} onChange = {e=> setCategory(e.target.value)}  id = "category" type = "text" placeholder = "Enter product category" />
            </div>
            <div className = "product-field">
                <label for = "company">Company</label>
                <input  value = {company} onChange = {e=> setCompany(e.target.value)}  id = "company" type = "text" placeholder = "Enter product company" />
            </div>
            <button onClick = {addProduct} className = "add-button">Add Product</button>
        </div>
    )
}