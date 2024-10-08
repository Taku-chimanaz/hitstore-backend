import  mongoose from 'mongoose'
const Schema = mongoose.Schema;

const productSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    whatsappLink: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

export default Product;