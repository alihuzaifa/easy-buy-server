import express from "express";
import { addToCart, getAllCartItems, getCartItems } from "../controllers/Cart.js";
const router = express.Router();
router.post("/addToWish", addToCart);
router.get("/getCart", getCartItems);
router.get("/getAllCart", getAllCartItems);
export default router;