import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const tutorApplicationSchema = new Schema({

    nameOfStudent: {
        type: String,
        required: true
    },

    regNumber: {
        type: String,
        required: true
    },

    studentResults: {
        type: String,
        required: true,
    },

    applicationStatus: {
        type: String,
        default: "active"
    }

});

const TutorApplication = mongoose.model("Tutor-Application", tutorApplicationSchema);
export default TutorApplication;