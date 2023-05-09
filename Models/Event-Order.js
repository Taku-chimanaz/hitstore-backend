import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventEventOrderSchema = new Schema({

    nameOfCustomer: {
        type: String,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    orderStatus: {
        type: String,
        default: "active"
    }
});

const EventOrder = mongoose.model('Event-Order', eventEventOrderSchema);
export default EventOrder;