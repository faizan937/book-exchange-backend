const Book = require("../models/book");
const User = require("../models/user");

// Upload a book
exports.uploadBook = async (req, res) => {
    const book = await Book.create({ ...req.body, owner: req.user.id });
    res.status(201).json(book);
};

// Get books uploaded by the current user
exports.getMyBooks = async (req, res) => {
    const books = await Book.find({ owner: req.user.id });
    res.json(books);
};

// Add a book to user's favorites
exports.favoriteBook = async (req, res) => {
    await User.findByIdAndUpdate(req.user.id, { $addToSet: { favorite: req.params.id } });
    res.json({ success: true });
};

// Search for books
exports.searchBooks = async (req, res) => {
    const { title, category, location } = req.query;
    const query = {};
    if (title) query.title = new RegExp(title, "i");
    if (category) query.category = category;
    if (location) query.location = location;

    const books = await Book.find(query);
    res.json(books);
};
