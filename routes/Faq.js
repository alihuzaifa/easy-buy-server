import express from "express";
import { addFaq, deleteFaq, updateFaq } from "../controllers/Faq.js";
const router = express.Router();
router.post("/addFaq", addFaq);
router.delete("/deleteFaq", deleteFaq);
router.delete("/updateFaq", updateFaq);
export default router;