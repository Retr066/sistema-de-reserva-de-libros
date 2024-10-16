import { AuthenticatedRequest } from "@interfaces/auth.interface";
import Book from "@models/Book";
import Reservation from "@models/Reservation";
import { Response } from "express";

const createReservation = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { bookId } = req.body;
      const book = await Book.findById(bookId);
      if (!book || book.availableQuantity === 0) {
        return res.status(400).json({ error: 'Book not available' });
      }
  
      const activeReservations = await Reservation.countDocuments({
        user: req.user?.userId,
        status: { $in: ['reserved', 'borrowed'] },
      });
  
      if (activeReservations >= 3) {
        return res.status(400).json({ error: 'Maximum number of reservations reached' });
      }
  
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + 3);
  
      const reservation = new Reservation({
        user: req.user?.userId,
        book: bookId,
        dueDate,
      });
  
      await reservation.save();
      book.availableQuantity -= 1;
      await book.save();
  
      res.status(201).json(reservation);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


const getReservations = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const reservations = await Reservation.find({ user: req.user?.userId }).populate('book');
      res.json(reservations);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


const updateReservation = async (req: AuthenticatedRequest, res: Response) => {
        try {
        const { status } = req.body;
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    
        if (!reservation) {
          return res.status(404).json({ error: 'Reservación no encontrada' });
        }
    
        if (status === 'returned') {
          const book = await Book.findById(reservation.book);
          if (book) {
            book.availableQuantity += 1;
            await book.save();
          }
        }
    
        res.json(reservation);
      } catch (error: any) {
        res.status(400).json({ error: error.message });
      }
    }


export { createReservation, getReservations, updateReservation };
