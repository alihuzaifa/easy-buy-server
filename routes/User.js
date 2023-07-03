import express from "express";
import { updatePass, checkOtp, login, sendOtp, signup } from "../controllers/User.js";
const router = express.Router();
router.post("/login", login);
router.post("/signup", signup);
router.post("/sendOtp", sendOtp);
router.post("/checkOtp", checkOtp);
router.put("/updatePassword", updatePass);
export default router;