import { Schema, model, Document } from 'mongoose';

interface IReservation extends Document {
  user: Schema.Types.ObjectId;
  book: Schema.Types.ObjectId;
  status: 'reserved' | 'borrowed' | 'returned';
  reservationDate: Date;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const reservationSchema = new Schema<IReservation>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['reserved', 'borrowed', 'returned'], default: 'reserved' },
  reservationDate: { type: Date, default: Date.now },
  dueDate: { type: Date, required: true },
}, { timestamps: true });

export default model<IReservation>('Reservation', reservationSchema);
