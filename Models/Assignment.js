import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const assignmentSchema = new Schema({

    nameOfStudent: {
        type: String,
        required: true,
    },

    part: {
        type: String,
        required: true
    },

    school: {
        type: String,
        required: true
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

const Assignment = mongoose.model("Assignment", assignmentSchema);
export default Assignment;