const {Product} = require('../model/product.model')
const {generateSlug} = require('../utils/generateSlug');
const cloudinary = require('../utils/cloudinary');
const { promises } = require('node:dns');


const createProduct = async (req, res) => {
    try {
        console.log(req.body);
        
      const {name, price, productimage, description, category, stock} = req.body;  
      if (!name || !price || !productimage || !description || !category || !stock ) {
        return res.status(400).send({message: "All fields are required", status: "false"});  
      }
      const slug = generateSlug(name);
      const allimage = await Promise.all(productimage.map(async(image)=>{
        const productimage = await cloudinary.uploader.upload(image, {folder: 'products'})
        return productimage.secure_url;
      }))
       const newproduct = await Product.create({
            name,
            slug,
            price,
            productimage: allimage,
            description,
            category,
            stock})
            if (newproduct) {
             return res.status(200).send({message: "Product uploaded successfully", status: "true", newproduct});  
                
            }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({message: "Internal server error", status: "false"});
    }
}

const getAllProducts = async(req,res)=>{
    try {
        const {limit, page} = req.query;
     const allproduct = await Product.find().skip(page).limit(limit).sort({_id:-1});
     if (allproduct) {
        return res.status(200).send({message: "All products fetched", status: "true", allproduct});
     }
    } catch (error) {
        return res.status(500).send({message: "Internal server error", status: "false"});
    }
}



module.exports = {createProduct, getAllProducts};