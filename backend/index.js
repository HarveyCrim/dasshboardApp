const express = require("express");
require("./database/config")
const app = express();
require("dotenv").config();
const cors = require("cors");
const Product = require("./database/Product")
const User = require("./database/User");
const jwt = require("jsonwebtoken");
const secret = "gvnerigv8enf38";
app.use(cors());
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("testing")
})

//signup process
app.post("/signup" , async (req,res)=>{
    const userCreated = await User.create(req.body);
    const userObject = userCreated.toObject();
    delete userObject.password;
    const token = jwt.sign({userObject}, process.env.SECRET_KEY);
    if(token){
        res.json({userObject, token})
    }
    else{
        res.json({result : "failure"});
    }
    
})

//login process
app.post("/login", async (req,res)=>{
    const doc = await User.findOne(req.body).select("-password");
    if(doc){
        const token = jwt.sign({doc}, process.env.SECRET_KEY)
        if(token){
            res.json({doc, token})
        }
        else{
            res.json({result : "error generating token"})
        }
       
    }
    else{
        res.json({result : "user not found"})
    }
})

//adding a product
app.post("/add-product",verify, async (req,res)=>{
    const doc = await Product.create(req.body);
    if(doc){
        res.json(doc.toObject())
    }
    else{
        res.json({result : "could not create record"})
    }
})

app.post("/", verify, async (req,res)=>{
    const docs = await Product.find({userid : req.body.userid});
    if(docs){
        res.json(docs)
    }
    else{
        rs.json({result : "no docs found for current user"})
    }
})

//receive a product when update clicked
app.get("/update/:id", async (req,res)=>{
    const productId = req.params.id;
    const doc = await Product.findOne({_id : productId});
    if(doc){
        res.json(doc)
    }
    else{
        res.json({result : "record not found"})
    }
})

//update a product
app.put("/update/", verify, async (req,res)=>{
    const obj = req.body;
    const id = obj.id;
    delete obj.id;
    const doc = await Product.updateOne({_id : id}, {
        $set : obj
    })
    if(doc){
        res.json(doc);
    }
    else{
        res.json({result : "could not update"})
    }
})

//delete a product
app.delete("/delete/:id", verify, async (req,res)=>{
    const deleteDoc = await Product.deleteOne({_id : req.params.id});
    if(deleteDoc){
        res.json(deleteDoc);
    }
    else{
        res.json({result : "could not delete record"})
    }
})

//search api
app.post("/search", verify, async (req,res)=>{
    const key = req.body.keyForSearch;
    const products = await Product.find({
        $or : [
            {name : {$regex : key, $options : "i"}},
            {price : {$regex : key, $options : "i"}},
            {category : {$regex : key, $options : "i"}},
            {company : {$regex : key, $options : "i"}}
    ]
    });
    if(products){
        res.json(products);
    }
    else{
        res.json({result : "none found"});
    }

})

//token verification for every api call
function verify(req,res,next){
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, (err,success)=>{
            if(err){
                res.json({error : "invalid token"})
            }
            else{
                next();
            }
        })
    }
}
app.listen(4000);