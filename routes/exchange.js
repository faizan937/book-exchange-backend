const express = require("express");
const router = express.Router();
const exchangeController = require("../controllers/exchangeController");
const auth = require("../middlewares/authmiddleware");

router.post("/request", auth, exchangeController.createRequest);
router.put("/:id/accept", auth, exchangeController.acceptRequest);
router.put("/:id/decline", auth, exchangeController.declineRequest);
router.put("/:id/deliver", auth, exchangeController.markDelivered);

module.exports = router;
