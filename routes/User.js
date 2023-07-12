import express from "express";
import { updatePass, checkOtp, login, sendOtp, signup, GetAllUser } from "../controllers/User.js";
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/sendOtp", sendOtp);
router.post("/checkOtp", checkOtp);
router.put("/updatePassword", updatePass);
router.put("/allUser", GetAllUser);
export default router;