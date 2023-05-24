import "./Update.css"
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export default function Update(){
    const params = useParams();
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const navigate = useNavigate();
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    useEffect(()=>{
        getProduct();
    },[]);
    const getProduct = async()=>{
        const doc = await fetch(`http://localhost:4000/update/${params.id}`);
        const docParsed = await doc.json();
        if(docParsed){
            setName(docParsed.name);
            setPrice(docParsed.price);
            setCategory(docParsed.category);
            setCompany(docParsed.company);
        }
    }
    const updateProduct = async ()=>{
        const updateRequest = await fetch("http://localhost:4000/update/",{
            method : "put",
            body : JSON.stringify({id : params.id, name,price,category,company}),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : JSON.parse(localStorage.getItem("token"))
            }
        });
        const responeParsed = await updateRequest.json();
        if(responeParsed){
            alert("Record successfully updated");
            navigate("/");
        }
    }
    return(
        <div className = "update-comp">
            <h1>Update a Product</h1>
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
            <button onClick = {updateProduct} className = "update-button">Update Product</button>
        </div>
    )
}