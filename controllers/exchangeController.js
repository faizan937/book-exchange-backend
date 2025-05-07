const Exchange = require("../models/Exchange");

exports.createRequest = async (req, res) => {
  const { requestedBook, offeredBook, responder } = req.body;
  const exchange = await Exchange.create({ requestedBook, offeredBook, responder, requester: req.user.id });
  res.status(201).json(exchange);
};

exports.acceptRequest = async (req, res) => {
  await Exchange.findByIdAndUpdate(req.params.id, { status: "accepted" });
  res.json({ success: true });
};

exports.declineRequest = async (req, res) => {
  await Exchange.findByIdAndUpdate(req.params.id, { status: "declined" });
  res.json({ success: true });
};

exports.markDelivered = async (req, res) => {
  await Exchange.findByIdAndUpdate(req.params.id, { status: "delivered" });
  res.json({ success: true });
};