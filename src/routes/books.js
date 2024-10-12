const express = require('express');
const Book = require('../models/Book');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { title, author, category, isbn, availability } = req.query;
    const query = {};
    if (title) query.title = new RegExp(title, 'i');
    if (author) query.author = new RegExp(author, 'i');
    if (category) query.category = new RegExp(category, 'i');
    if (isbn) query.isbn = isbn;
    if (availability === 'available') query.availableQuantity = { $gt: 0 };

    const books = await Book.find(query);
    res.json(books);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, author, category, isbn, publicationDate, quantity, location } = req.body;
    const book = new Book({
      title,
      author,
      category,
      isbn,
      publicationDate,
      quantity,
      availableQuantity: quantity,
      location,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, author, category, isbn, publicationDate, quantity, location } = req.body;
    const book = await Book.findByIdAndUpdate(req.params.id, {
      title,
      author,
      category,
      isbn,
      publicationDate,
      quantity,
      availableQuantity: quantity,
      location,
    }, { new: true });
    res.json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;