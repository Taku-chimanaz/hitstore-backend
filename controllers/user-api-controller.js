import User from './../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import {tokenAuth} from './../tokenAuth.js'
import { envVariables } from '../config.js';

const createUser = (req, res) => {

    const {name, userPassword} = req.body;

    new User({
        name,
        password: bcrypt.hashSync(userPassword, 8)
    }).save()
    .then(() => {
        res.json({
            message: "User created successfully"
        })
    })
    .catch(() =>{
        res.status(500).json({
            message: "Something went wrong"
        })
    })

}

const loginUser = async (req, res)=> {

    const {name, password} = req.body;
    const user = await User.findOne({name});

    if(!user){
        res.status(422).json({
            message: "User does not exist"
        })
    }else {

        const correctPassword = bcrypt.compareSync(password, user.password);

        if(correctPassword){
            const token = jwt.sign({id: user._id, name: user.name}, envVariables.secretKey);

            res.json({
                message: "Logged in successfully",
                token
            })
        }else {
            res.status(401).json({
                message: "Wrong password"
            })
        }

    }

}

const deleteUser = (req,res,next)=> {

    const id = req.params.id;
    console.log(id)
    const tokenValid = tokenAuth(req.token);
    
    if(tokenValid){
        User.findByIdAndDelete(id)
        .then(() => {
            res.json({
                message: "Account deleted Successfully"
            })
        })
        .catch(() => {
            res.status(500).json({
                message: "Something went wrong,please try again"
            })
        })
   }else {
       res.status(403).json({
           message: "You are not authorised"
       })
   }
}

const updateUser = (req, res)=> {

    const {id} = req.body;

    User.findByIdAndUpdate(id, {...req.body})
    .then(() => {
        res.json({
            message: "User updated successfully"
        })
    })
    .catch(()=>{
        res.status.json({
            message: "Something went wrong,please try again"
        })
    })

}

const getAllUsers =  async (req,res)=>{

    
   const tokenValid  = await tokenAuth(req.token);
    
   if(tokenValid){
        User.find()
        .then(users => {
            
            const filteredUserData = users.map(user => {

                return {
                    id: user._id,
                    nameOfStudent: user.nameOfStudent,
                    username: user.username,
                    regNumber: user.regNumber,
                    tutor: user.tutor
                }
            })
            
            res.json(filteredUserData);
        })
        .catch((err) => {
            console.log(err)
            res.status(500).json({
                message: "Sorry we could not get users"
            })
        })
   }else {
       res.status(403).json({
           message: "You are not authorised"
       })
   }


}
export default {
    createUser,
    loginUser,
    deleteUser,
    updateUser,
    getAllUsers
}