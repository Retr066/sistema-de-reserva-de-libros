import Book from "@models/Book";
import { Request, Response } from "express";

const findBooks = async (req: Request, res: Response) => {
    try {
      const { title, author, category, isbn, availability } = req.query;
      const query: any = {};  // Define `query` como `any` para poder agregar las condiciones dinámicamente
  
      if (title) query.title = new RegExp(title as string, 'i');
      if (author) query.author = new RegExp(author as string, 'i');
      if (category) query.category = new RegExp(category as string, 'i');
      if (isbn) query.isbn = isbn;
      if (availability === 'available') query.availableQuantity = { $gt: 0 };
  
      const books = await Book.find(query);
      res.json(books);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

const createBook = async (req: Request, res: Response) => {
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
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }


 
const updateBook = async (req: Request, res: Response) => {
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
    }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}
    

const deleteBook = async (req: Request, res: Response) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ message: "Libro eliminado correctamente" });
        }
    catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export { findBooks, createBook, updateBook, deleteBook };
