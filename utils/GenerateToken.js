import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export default function generateToken(user) {
    const { _id, name, email } = user;
    const payload = { _id, name, email };
    const options = { expiresIn: "100d" };
    const token = jwt.sign(payload, process.env.SECRET, options);
    return token;
}