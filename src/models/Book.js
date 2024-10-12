const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  publicationDate: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 0 },
  availableQuantity: { type: Number, required: true, min: 0 },
  location: {
    shelf: { type: String, required: true },
    aisle: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);