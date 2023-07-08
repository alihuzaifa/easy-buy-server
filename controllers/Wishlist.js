import Wishlist from "../models/Wishlist.js";
const addToWishlist = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            wishlist = new Wishlist({
                user: userId,
                items: []
            });
        }
        const existingItem = wishlist.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            return res.status(400).json({ success: false, message: 'Product already exists in the wishlist' });
        }
        wishlist.items.push({ product: productId });
        await wishlist.save();
        res.status(200).json({ success: true, message: "Added to your wishlist" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
const deleteWishlistItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) {
            return res.status(404).json({ success: false, message: 'Wishlist not found' });
        }
        const itemIndex = wishlist.items.findIndex(item => item._id.toString() === productId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: 'Item not found in the wishlist' });
        }
        wishlist.items.splice(itemIndex, 1);
        await wishlist.save();
        res.status(200).json({ success: true, message: 'Item deleted from wishlist successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export { addToWishlist, deleteWishlistItem }