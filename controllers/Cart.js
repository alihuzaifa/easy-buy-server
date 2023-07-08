import Cart from '../models/Cart.js'
const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: userId });
        if (!cart) { cart = new Cart({ user: userId, items: [] }) }
        const existingItemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (existingItemIndex !== -1) { cart.items[existingItemIndex].quantity += quantity }
        else {
            cart.items.push({ product: productId, quantity });
        }
        await cart.save();
        res.status(200).json({ success: true, message: "Order Confirm Successfully" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
const getCartItems = async (req, res) => {
    try {
        const { userId } = req.body;
        // const cart = await Cart.findOne({ user: userId }).populate('items.product');
        const cart = await Cart.findOne({ user: userId }).populate({ path: 'items.product', model: 'Product' });
        if (!cart) { return res.status(404).json({ success: false, error: 'Cart not found' }) }
        const cartItems = cart.items;
        return res.status(200).json({ success: true, cartItems });
    } catch (error) { return res.status(500).json({ success: false, error: error.message }) }
};
const getAllCartItems = async (req, res) => {
    try {
        const cartItems = await Cart.find({}).populate('User', '-password').populate('items.product');
        return res.status(200).json({ success: true, cartItems });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
export { addToCart, getCartItems, getAllCartItems }