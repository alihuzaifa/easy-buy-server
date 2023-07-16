import express from "express";
import { addFaq, deleteFaq, getAllFaq, updateFaq } from "../controllers/Faq.js";
const router = express.Router();
router.post("/addFaq", addFaq);
router.delete("/deleteFaq", deleteFaq);
router.put("/updateFaq", updateFaq);
router.get("/getFaq", getAllFaq);
export default router;