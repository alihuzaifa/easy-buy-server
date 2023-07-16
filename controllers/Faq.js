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
        const { _id } = req.body;
        await FAQ.findByIdAndDelete(_id);
        return res.json({ success: true, message: 'FAQ deleted successfully' });
    } catch (error) { return res.status(500).json({ success: false, message: 'Failed to delete FAQ' }) }
}
const updateFaq = async (req, res) => {
    try {
        const { _id } = req.body;
        const updatedFAQ = await FAQ.findByIdAndUpdate(_id, { question }, { answer }, { new: true });
        if (!updatedFAQ) {
            return res.status(404).json({ success: false, message: 'FAQ question not found' });
        }
        return res.json({ success: true, message: 'FAQ Update successfully' });
    } catch (error) { return res.status(500).json({ success: false, message: 'Failed to update FAQ' }) }
}
export { addFaq, deleteFaq, updateFaq };