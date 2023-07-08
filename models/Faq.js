import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const faqSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
});
const FAQ = model('FAQ', faqSchema);
export default FAQ;