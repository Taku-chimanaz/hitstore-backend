import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accomodationSchema = new Schema({

    address: {
        type: String,
        required: true
    },

    conditions: {
        type: Array,
        required: true
    },

    available: {
        type: Boolean,
        required: true
    },

    imagePath: {
        type: String,
        required: true
    }
});

const Accomodation = mongoose.model("Accomodation", accomodationSchema);

export default Accomodation;