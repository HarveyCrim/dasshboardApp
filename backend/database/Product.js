const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
    {
        userid : String,
        name : String,
        price : String,
        category : String,
        company : String
    }
);

module.exports = mongoose.model("Product",productSchema);