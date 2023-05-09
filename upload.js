import multer from "multer";
import fs, { exists } from 'fs'
import e from "express";

const dirChecking = (cb) => {

    fs.exists("images", exists => {

        if(exists){
            return cb(null, "images")
        }else {

            fs.mkdir("images", (err) => {
                if(err){
                    return cb(new Error("Could not create directory"))
                }else {
                    return cb(null, "images")
                }
            })
        }
    })
}

const storage = multer.diskStorage({

    destination: (req,file,cb) => {
         dirChecking(cb)
    },

    filename: (req, file, cb)=> {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

const upload = multer({

    storage,
    fileFilter: (req,file,cb) => {

        if(
            file.mimetype == "image/png" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg" 
        ){
            cb(null,true)
        }else {
            cb(null,false)
            return cb(new Error("Please upload a png,jpg or a jpeg image"))
        }
    }
}).single("image")

export default upload