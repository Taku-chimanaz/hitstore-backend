import Gossip from './../Models/Gossip.js';
import upload from '../upload.js';
import { tokenAuth } from '../tokenAuth.js';
import multer from 'multer';
import fs from 'fs'

const getAllGossips = (req,res) => {
    
    Gossip.find()
    .then(gossips => {
        res.json({
            message: "Gossips fetched successfully",
            gossips
        })
    })
    .catch(()=>{
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

const createGossip = (req,res)=>{

    const {gossipName, gossipBody} = req.body;
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

        new Gossip({
            gossipName,
            gossipBody,
            image: req.file.filename
        }).save()
        .then(gossip => {
            res.json({
                message: "Gossip saved successfully",
                gossip
            })
        })
        .catch(() => {
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

const updateGossip = (req,res) => {

    const tokenValid = tokenAuth(req.token);
    const {id, gossipName, gossipBody} = req.body;


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
 
    let updateDetails = {};

    if(tokenValid){


        if(req.file !== undefined){
            updateDetails.image = req.file.filename
        }

        if(gossipName !== undefined){
            updateDetails.gossipName = gossipName
        }

        if(gossipBody !== undefined){
            updateDetails.gossipBody = gossipBody
        }


        Gossip.findByIdAndUpdate(id, {...updateDetails})
        .then((gossip) => {

            req.file !== undefined && fs.rmSync(`images/${gossip.image}`);

            res.json({
                message: "Gossip updated Successfully"
            })
        })
        .catch((err) => {
            req.file !== undefined && fs.rmSync(`images/${req.file.filename}`);
            res.status(500).json({
                message: "Something went wrong",
                err: err.message
            })
        })

    }else {

        res.status(403).json({
            message: "You are authorised"
        })
    }
}


const deleteGossip = (req,res) => {

    const id = req.params.id;

    const tokenValid = tokenAuth(req.token);

    
    if(tokenValid){
        
        Gossip.findByIdAndDelete(id)
        .then((gossip) => {
            fs.rmSync(`images/${gossip.image}`);
            res.json({message: "Gossip deleted successfully"})
        })
        .catch((err) => res.status(500).json({message: "Something went wrong", err: err.message}))
    }else {
        res.status(403).json({
            message: "You are not authorised"
        })
    }
}

export default {
    getAllGossips,
    createGossip,
    updateGossip,
    deleteGossip
}