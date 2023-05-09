import Accomodation from './../Models/Accomodation.js'
import { tokenAuth } from '../tokenAuth.js';
import fs from 'fs';
import formidable from 'formidable'
import path, { delimiter, dirname, isAbsolute } from 'path';
import upload from './../upload.js';
import multer from 'multer';
const __dirname = path.resolve();

const getAllAccomodations = (req,res)=>{

 
    Accomodation.find()
    .then(accomodations => {

        res.json({
            message: "Accomodations fetched successfully",
            accomodations
        });
    })
    .catch(() => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })

}

const createAccomodation = async (req,res)=>{

    const {address, conditions, available} = req.body
    
    const tokenValid = tokenAuth(req.token);

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
    });

    if(tokenValid){


        new Accomodation({
            address,
            conditions: conditions.split(" "),
            available,
            imagePath: req.file.filename
        }).save()
        .then(accomodation => {
            res.json({
                message: "Accomodation added successfully",
                accomodation
            })
        })
        .catch(err => {
            req.file !== undefined && fs.rmSync(`images/${req.file.filename}`);
            console.log(err);
            res.status(500).json({
                message: "Something went wrong"
            })
        })


    }else {
        res.status(403).json({
            message: "You are not authorised"
        })
    }
    
}


const updateAccomodation = (req,res) => {

    const {id, address, conditions, available} = req.body;

    const tokenValid = tokenAuth(req.token);


    if(tokenValid){

        const updateDetails = {};

        if(address !== undefined){
            updateDetails.address = address
        }

        if(conditions !== undefined){
            updateDetails.conditions = conditions.split(" ")
        }

        if(available !== undefined){
            updateDetails.available = available
        }

        if(req.file !== undefined){
            updateDetails.imagePath = req.file.filename
        }

        Accomodation.findByIdAndUpdate(id, {...updateDetails})
        .then((accomodation) => {

            req.file !== undefined && fs.rmSync(`images/${accomodation.imagePath}`)
            res.json({
                message: "Update was successful",
            })

        })
        .catch(() => {
            
            req.file !== undefined && fs.rmSync(`images/${req.file.filename}`)
            res.status(500).json({
                message: "Something went wrong,try again"
            })
        })
    }else {
        req.file !== undefined && fs.rmSync(`images/${req.file.filename}`)
        res.status(403).json({
            message: "You are not authorised"
        })
    }

}

const deleteAccomodation = (req,res)=>{

    const id = req.params.id;
    
    // checking validity of the token

    const tokenValid = tokenAuth(req.token);

    if(tokenValid) {

        // delete  accomodation

        Accomodation.findByIdAndDelete(id)
        .then((accomodation) => {

            // deleting accomodation image

            fs.rmSync(`images/${accomodation.imagePath}`);

            res.json({
                message: "Accomodation deleted successfully"
            })
        })
        .catch((err) => {
            res.status(500).json({
                message: "Something went wrong",
                err: err.message
            })
        })
    }else {
        res.status(403).json({
            message: "You are not authorised"
        })
    }
}

export default {
    getAllAccomodations,
    createAccomodation,
    updateAccomodation,
    deleteAccomodation
}