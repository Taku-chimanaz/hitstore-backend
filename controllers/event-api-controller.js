import Event from './../Models/Event.js'
import fs from 'fs'
import { tokenAuth } from '../tokenAuth.js';
import multer from 'multer';
import upload from '../upload.js';

const createEvent = (req,res)=>{

    const tokenValid = tokenAuth(req.token);
    const {date, title} = req.body;

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

    if(tokenValid){

        new Event({
            title,
            date,
            imagePath: req.file.filename
        }).save()
        .then(event => {
            res.json({
                message: "Event added successfully",
                event
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


const getAllEvents = (req, res)=> {

    Event.find()
    .then(events => {
        res.json({
            message: "Events fetched successfully",
            events
        })
    })
    .catch(() => {
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

const deleteEvent = (req, res)=> {

    const id = req.params.id;
    const tokenValid = tokenAuth(req.token)
    
    if(tokenValid){

        Event.findByIdAndDelete(id)
    .   then((event) => {
            
            fs.rmSync(`images/${event.imagePath}`);

            res.json({
                message: "Event deleted successfully"
            })
        })
        .catch((err) => {
            console.log(err)
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


const updateEvent = (req, res)=> {

    const {id, title, date} = req.body;
    const tokenValid = tokenAuth(req.token)


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
    
    if(tokenValid){

        let updateDetails  = {};

        if(title !== undefined){
            updateDetails.title = title
        }

        if(date !== undefined){
            updateDetails.date = date;
        }

        if(req.file !== undefined){
            updateDetails.imagePath = req.file.filename;
        }


        Event.findByIdAndUpdate(id, {...updateDetails})
        .then((event) => {

            req.file !== undefined && fs.rmSync(`images/${event.imagePath}`);
            res.json({
                message: "Event updated successfully"
            });

        })
        .catch((err) => res.json({message: "Something went wrong", err: err.message}))

        

    }else {
        res.status(403).json({
            message: "You are not authorised"
        })
    }
}



export default {
    createEvent,
    getAllEvents,
    deleteEvent,
    updateEvent
}