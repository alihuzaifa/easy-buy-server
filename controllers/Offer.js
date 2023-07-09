import getDataUri from "../middleware/DataUri.js";
import Offer from "../models/Offer.js";
import cloudinary from "cloudinary";
const AddOffers = async (req, res) => {
    try {
        console.log("Hello")
        // const file = req?.file;
        // const fileUri = getDataUri(file);
        // const myCloud = await cloudinary.v2.uploader.upload(fileUri?.content);
        // const newOffer = {
        //     image: {
        //         public_id: myCloud?.public_id,
        //         url: myCloud?.url,
        //     },
        // };
        // await Offer.create(newOffer);
        return res.status(200).json({ message: "Offer Added Successfully" });
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
};
const DeleteOffer = async (req, res) => {
    try {
        const { _id } = req?.body;
        if (!_id) return res.status(401).json({ message: "Data is missing" });
        const findOffer = await Offer.findOne({ _id: _id });
        const publicId = findOffer?.image?.public_id
        await cloudinary?.uploader?.destroy(publicId)
        const removeOffer = await Offer.deleteOne({ _id: _id });
        if (removeOffer) {
            return res.status(200).json({ message: "Offer removed successfully" });
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
};
const GetAllOffers = async (req, res) => {
    try {
        const AllOffers = await Offer.find({});
        if (AllOffers) {
            return res.status(200).json(AllOffers);
        }
    } catch (error) {
        return res.status(500).json({ message: error?.message });
    }
};
export { AddOffers, DeleteOffer, GetAllOffers };