import Order from './../Models/Order.js';
import {tokenAuth} from './../tokenAuth.js'

const createOrder = (req, res)=> {
    
    const orderDetails = req.body;
    
    new Order(orderDetails).save()
    .then(() => {
        res.json({
            message: "Order was created Successfully"
        })
    })
    .catch((err) =>{
        
        res.status(500).json({
            message: "Something went wrong,try again"
        })
    })
    
}

const getAllOrders = (req,res)=>{

    Order.find()
    .then(orders => {
        res.json({
            message: "Orders fetched successfully",
            orders
        })
    })
    .catch(() => {
        
        res.status(500).json({
            message: "Something went wrong"
        })
    })
}

const markOrderDelivered = (req, res) => {

    const id = req.params.id;
    const tokenValid = tokenAuth(req.token)
    
   if(tokenValid){

        Order.findByIdAndUpdate(id, {orderStatus: "delivered"})
        .then(() => {
            res.json({
                message: "Order marked delivered successfully"
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

const cancelOrder = (req, res) => {

    const id = req.params.id;
    const tokenValid = tokenAuth(req.token);

    if(tokenValid){
        Order.findByIdAndUpdate(id, {orderStatus: "canceled"})
        .then(() => {
            res.json({
                message: "Order canceled successfully"
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
    createOrder,
    getAllOrders,
    markOrderDelivered,
    cancelOrder
}