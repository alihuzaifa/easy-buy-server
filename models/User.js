import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String,
  },
  otp: {
    type: Number,
  },
  phone: {
    type: String,
    required: true,
    minlength: 11,
    maxlength: 11
  }
}, { timestamps: true });
const User = mongoose.model('User', userSchema);
export default User;