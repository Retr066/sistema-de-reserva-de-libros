import { Schema, model, Document } from 'mongoose';

interface IBook extends Document {
  title: string;
  author: string;
  category: string;
  isbn: string;
  publicationDate: Date;
  quantity: number;
  availableQuantity: number;
  location: {
    shelf: string;
    aisle: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}

const bookSchema = new Schema<IBook>({
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

export default model<IBook>('Book', bookSchema);
