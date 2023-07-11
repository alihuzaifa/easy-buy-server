import getDataUri from "../middleware/DataUri.js";
import Product from "../models/Product.js";
import cloudinary from 'cloudinary'
const addProduct = async () => {
    try {

        const file = req?.file;
        const fileUri = getDataUri(file);
        const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) { return res.status(400).json({ message: "All data is required" }) }
        const product = new Product({
            name,
            description,
            price,
            category,
            image: {
                public_id: myCloud?.public_id,
                url: myCloud?.url,
            },
        });
        await product.save();
        return res.status(201).json({ success: true, message: "Product added successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}
const deleteProduct = async () => {
    try {
        const { _id } = req?.body;
        const findProduct = await Product.findOne({ _id })
        const cloudinaryId = findProduct?.image?.public_id
        const { result } = await cloudinary.uploader.destroy(cloudinaryId)
        if (result == "ok") {
            await Product.deleteOne({ _id });
            return res.status(200).json({ message: "Product Deleted Successfully" });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
const updateProduct = async (req, res) => {
    if (req?.body?.isUpload == false) {
        try {
            const { name, description, price, category, _id } = req.body;
            if ((!name || !category || !description || !price || !discount, !_id)) return res.status(401).json({ message: "Data is missing" });
            await Product.findByIdAndUpdate(_id, { name, category, description, price, discount }, { new: true }
            ).exec();
            return res.status(200).json({ message: "Product update successfully" });
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    } else {
        try {
            const file = req?.file
            const fileUri = getDataUri(file);
            const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
            const { name, description, price, category, _id } = req.body;
            if ((!name || !category || !description || !price || !_id)) return res.status(401).json({ message: "Data is missing" });
            const findDishId = await Product.findOne({ _id })
            const public_id = findDishId?.image?.public_id
            const { result } = await cloudinary.uploader.destroy(public_id)
            if (result == "ok") {
                await Product.findByIdAndUpdate(_id, {
                    name, category, description, price, image: { public_id: myCloud?.public_id, url: myCloud?.url },
                }, { new: true }
                ).exec();
                return res.status(200).json({ message: "Product update successfully" });
            }
        } catch (error) {
            return res.status(500).json({ success: false, error: error.message });
        }
    }

};
const getAllCategory = async (req, res) => {
    try {
        const categories = await Product.distinct("category");
        if (categories) {
            return res.status(200).json(categories);
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};
const getProducts = async (req, res) => {
    try {
        const { page, limit } = req?.params
        const skip = (page - 1) * limit;
        const products = await Product.find({}).skip(skip).limit(limit);
        const totalProducts = await Product.countDocuments();
        const remainingProducts = totalProducts - (skip + products.length);
        return res.status(200).json({ data: { products, skip, limit, remainingProducts } });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
const searchProductsByName = async (req, res) => {
    try {
        const { query } = req.params;
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};
export { addProduct, deleteProduct, updateProduct, getAllCategory, getProducts, searchProductsByName }