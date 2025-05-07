const Feedback = require("../models/Feedback");

// Create Feedback
exports.createFeedback = async (req, res) => {
  try {
    const { feedback, rating } = req.body;

    // Validate input
    if (!feedback || rating == null) {
      return res.status(400).json({ error: "Feedback and rating are required" });
    }

    const newFeedback = new Feedback({ feedback, rating });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted!", data: newFeedback });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Feedbacks
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};