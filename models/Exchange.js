const mongoose = require("mongoose");

const exchangeSchema = new mongoose.Schema({
  bookRequested: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  bookOffered: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  responder: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["pending", "accepted", "declined"], default: "pending" },
});

module.exports = mongoose.model("Exchange", exchangeSchema);
