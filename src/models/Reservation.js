const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['reserved', 'borrowed', 'returned'], default: 'reserved' },
  reservationDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);