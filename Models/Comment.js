import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const commentSchema = new Schema({

    owner: {
        type: String,
        required: true
    },

    commentedPost: {
        type: String,
        required: true
    },

    commentBody: {
        type: String,
        required: true
    }
},{timestamps: true});

const Comment = mongoose.model('Comments', commentSchema);

export default Comment;