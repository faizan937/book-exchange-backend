const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, bookController.uploadBook);
router.get("/my", auth, bookController.getMyBooks);
router.post("/:id/favorite", auth, bookController.favoriteBook);
router.get("/", bookController.searchBooks);

module.exports = router;