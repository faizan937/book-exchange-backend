const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  day: String,
  time: String,
  location: String,
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
