import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const gossipSchema = new Schema({

    gossipName: {
        type: String,
        required: true
    },

    gossipBody: {
        type: String,
        required: true
    },

    image: {
        type: String,
    }
});

const Gossip = mongoose.model("Gossip", gossipSchema);

export default Gossip;