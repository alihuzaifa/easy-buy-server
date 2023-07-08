import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image: {
        public_id: String,
        url: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose.model('Product', productSchema);
export default Product