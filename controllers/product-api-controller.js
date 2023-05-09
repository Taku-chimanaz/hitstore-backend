import Product from '../Models/Product.js';
import { tokenAuth } from '../tokenAuth.js';
import multer from 'multer';
import upload from '../upload.js';
import fs from 'fs';

const createProduct = (req,res)=>{

    const image = req.file.filename;

    const {productName, productPrice, productDesc, whatsappLink} = req.body;

    upload(req,res, (err) => {

        if(err instanceof multer.MulterError){
            res.status(500).json({
                message: "Could not upload image"
            })
        }else if(err){
            res.status(500).json({
                message: "Could not upload image",
                err
            })
        }
    })

    new Product({
        name: productName,
        price: productPrice,
        description: productDesc,
        image,
        whatsappLink
    }).save()
    .then(product => {
        res.json({
            message: "Product saved successfully",
            product
        })
    })
    .catch(() => {
        fs.rmSync(`images/${image}`)
        res.status(500).json({
            message: "Something went wrong"
        })
    })

}

const getAllProducts = (req,res)=>{

    Product.find()
    .then(products => {
        res.json({
            message: "products fetched successfully",
            products
        })
    })
    .catch(() => {
        res.status(500).json({
            message: "Something went wrong"
        });
    })
}

const deleteProduct = (req,res)=>{

    const id = req.params.id;
    const tokenValid = tokenAuth(req.token);

    if(tokenValid){

        Product.findByIdAndDelete(id)
        .then((product) => {
            fs.rmSync(`images/${product.image}`);
            res.json({message: "Product was deleted successfully"})
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json("Something went wrong");
        })

    }else {

        res.status(403).json({
            message: "You are not authorised"
        })
    }

    
}

const updateProduct = (req,res)=>{

    const {id, name, price, description} = req.body;
    let updateDetails = {};



    upload(req,res, (err) => {

        if(err instanceof multer.MulterError){
            res.status(500).json({
                message: "Could not upload image"
            })
        }else if(err){
            res.status(500).json({
                message: "Could not upload image",
                err
            })
        }
    })

    
    
    if(req.file !== undefined) {
        updateDetails.image = req.file.filename;
    }

    if(name !== undefined){
        updateDetails.name = name;
    }

    if(price !== undefined){
        updateDetails.price = price;
    }

    if(description !== undefined){
        updateDetails.description = description
    }



    Product.findByIdAndUpdate(id, {...updateDetails})
    .then((product) => {

        req.file !== undefined && fs.rmSync(`images/${product.image}`);
        res.json({message: "Product updated successfully"})
    })
    .catch((err) => {
        console.log(err)
        res.status(500).json({message: "Something went wrong"})
    })
}

export default {
    createProduct,
    getAllProducts,
    deleteProduct,
    updateProduct
}