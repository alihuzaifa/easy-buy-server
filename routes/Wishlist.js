import express from "express";
import { addToWishlist, deleteWishlistItem } from "../controllers/Wishlist.js";
const router = express.Router();
router.post("/addToWish", addToWishlist);
router.delete("/deleteWish", deleteWishlistItem);
export default router;