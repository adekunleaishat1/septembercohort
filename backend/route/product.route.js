const express = require('express')
const productRouter = express.Router();
const {createProduct, getAllProducts} = require('../controller/product.controller');


productRouter.post('/create-product', createProduct);
productRouter.get('/allproduct', getAllProducts);

module.exports = {productRouter};