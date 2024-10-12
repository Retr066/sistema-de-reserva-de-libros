const express = require('express');
const Reservation = require('../models/Reservation');
const Book = require('../models/Book');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { bookId } = req.body;
    const book = await Book.findById(bookId);
    if (!book || book.availableQuantity === 0) {
      return res.status(400).json({ error: 'Book not available' });
    }

    const activeReservations = await Reservation.countDocuments({
      user: req.user.userId,
      status: { $in: ['reserved', 'borrowed'] },
    });

    if (activeReservations >= 3) {
      return res.status(400).json({ error: 'Maximum number of reservations reached' });
    }

    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 3);

    const reservation = new Reservation({
      user: req.user.userId,
      book: bookId,
      dueDate,
    });

    await reservation.save();
    book.availableQuantity -= 1;
    await book.save();

    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/user', authMiddleware, async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user.userId }).populate('book');
    res.json(reservations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (status === 'returned') {
      const book = await Book.findById(reservation.book);
      book.availableQuantity += 1;
      await book.save();
    }

    res.json(reservation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;