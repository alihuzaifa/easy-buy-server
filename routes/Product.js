import express from "express";
import { addProduct, deleteProduct, getAllCategory, getProducts, searchProductsByName, updateProduct } from "../controllers/Product.js";
import singleUpload from "../middleware/Multer.js";
const router = express.Router();
router.post("/add", addProduct);
router.delete("/delete", deleteProduct);
router.put("/updateDish", (req, res, next) => {
    if (req?.body?.isUpload == false) {
        next()
    } else {
        singleUpload(req, res, next);
    }
}, updateProduct);
router.get("/categories", getAllCategory);
router.get('/getAllProducts/:limit/:page', getProducts);
router.get('/getAllProducts/:query', searchProductsByName);

export default router;