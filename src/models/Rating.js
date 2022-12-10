const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
    From: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    To: {
        type: mongoose.SchemaTypes.ObjectId,
    },
    Review: {
        type: String,
    },
    OTP: {
        type: Number,
        default: 0,
    },
    Negotiation: {
        type: Number,
        default: 0,
    },
    Responsive: {
        type: Number,
        default: 0,
    },
    Ethical: {
        type: Number,
        default: 0,
    },
    Recommendation: {
        type: Boolean,
    },
    Time: {
        type: String,
    },
    Screenshots: [
        {
            type: String,
        }
    ],
});

const Rating = new mongoose.model("Rating", RatingSchema);
module.exports = Rating;
