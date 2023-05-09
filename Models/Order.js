import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({

    nameOfCustomer: {
        type: String,
        required: true
    },

    orderedProduct: {
        type: String,
        required: true,
    },

    quantity: {
        type: Number,
        required: true,
    },

    phoneNumber: {
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        default: "active"
    }
})

const Order = mongoose.model('Order', orderSchema);
export default Order;