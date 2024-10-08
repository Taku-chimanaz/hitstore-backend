import mongoose from  'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    date: {
        type: String,
        required:  true,
    },

    imagePath: {
        type: String,
        required: true
    }
})

const Event = mongoose.model("Event", eventSchema);
export default Event;