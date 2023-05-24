import { useEffect, useRef, useState } from "react";
import "./Home.css"
import { Link } from "react-router-dom";
export default function Home(){
    useEffect( ()=> {
        getProducts();
    },[]);
    const[list, setList] = useState([]);
    const searchKey = useRef();
    const getProducts = async ()=> {
        const userid = JSON.parse(localStorage.getItem("user"))._id;
        console.log(userid);
        const productList = await fetch("http://localhost:4000/",{
            method : "post",
            body : JSON.stringify({userid}),
            headers : {
                "Content-Type" : "application/json",
                "authorization" : JSON.parse(localStorage.getItem("token"))
            }
        })
        const productListParsed = await productList.json();
        console.log("this list");
        console.log(productListParsed);
        setList(productListParsed);
    }
    const deleteRecord = async (id)=> {
        const deletedRecord = await fetch(`http://localhost:4000/delete/${id}`,{
            method : "delete",
            headers : {
                "Authorization" : JSON.parse(localStorage.getItem("token"))
            }
        });
        const deletedParsed = await deletedRecord.json();
        if(deletedParsed){
            getProducts();
        }
    }
    
    const findThroughKey = async (e)=> {
        const keyForSearch = e.target.value;
        const resultList = await fetch("http://localhost:4000/search",{
            method : "post",
            body : JSON.stringify({keyForSearch}),
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : JSON.parse(localStorage.getItem("token"))
            }
        })
        const resultListParsed = await resultList.json();
        setList(resultListParsed);
    }

    return (
        <div className = "product-table">
        <h1> Product Listing</h1>
        <input type = "text" onChange = {e=>findThroughKey(e)} placeholder = "Enter data" className = "searchBox" />
        <ul className = "ul-heading">
            <li>Serial No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Company</li>
            <li>Options</li>
        </ul>
        {
            list && list?.map((item, index)=>{
                return <ul className = "item-list">
                    <li>{index + 1}</li>
                    <li>{item.name}</li>
                    <li>{item.price}</li>
                    <li>{item.category}</li>
                    <li>{item.company}</li>
                    <li>{<span><Link className = "removeUnderline" to = {`/update/${item._id}`}>Update</Link></span> }| <span onClick = {e=>deleteRecord(item._id)}> Delete</span></li>
                </ul>
            })
        }
        {list.length == 0 && <p>No records to show</p>}
        </div>
    )
}