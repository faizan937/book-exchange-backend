const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
        required: true,
        trim: true,

    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,

    },

}, { timestamps: true });
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;