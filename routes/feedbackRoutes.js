const express = require("express");
const { newFeedback, getFeedbacks, createFeedback } = require("../controller/feedbackcontroller");
const router = express.Router();
router.post("/create", createFeedback);

router.get("/get", getFeedbacks);
module.exports = router;