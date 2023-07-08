import FAQ from "../models/Faq.js";
const addFaq = async (req, res) => {
    try {
        const { question, answer } = req.body;
        const faq = new FAQ({ question, answer });
        await faq.save();
        return res.status(201).json({ success: true, message: "Faq added successfully" });
    } catch (error) { return res.status(500).json({ success: false, message: error?.message }) }
}
const deleteFaq = async (req, res) => {
    try {
        const { id } = req.body;
        await FAQ.findByIdAndDelete(id);
        return res.json({ success: true, message: 'FAQ deleted successfully' });
    } catch (error) { return res.status(500).json({ error: 'Failed to delete FAQ' }) }
}
export { addFaq, deleteFaq };