import Assignment from './../Models/Assignment.js';

const createAssignmentOrder = (req,res)=> {

    const assignDetails = req.body;

    new Assignment(assignDetails).save()
    .then(() => {
        res.json({
            message: "Request was sent successfully,We will get back to you"
        })
    })
    .catch(() => {
        
        res.status(500).json({
            message: "Something went wrong,try again."
        })
    })

}

const cancelAssignmentOrder = (req,res)=>{

    const {id} = req.body;

    Assignment.findByIdAndUpdate(id, {orderStatus: "canceled"})
    .then(() => {

        res.json({
            message: "Order canceled successfully"
        })
    })
    .catch(() => {

        res.status(500).json({
            message: "Something went wrong,try again"
        })
    })
}

const markAsDelivered = (req,res)=>{

    const {id} = req.body;

    Assignment.findByIdAndUpdate(id, {orderStatus: "delivered"})
    .then(() => {

        res.json({
            message: "Order marked as delivered successfully"
        })
    })
    .catch(() =>  {

        res.status(500).json({
            message: "Something went wrong,try again."
        })
    })
}

export default {
    createAssignmentOrder,
    cancelAssignmentOrder,
    markAsDelivered,
}