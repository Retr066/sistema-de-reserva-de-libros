import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '@middlewares/auth';
import { createBook, deleteBook, findBooks, updateBook } from '@controllers/books.controller';
import bookSchema from '@schemas/book.schema';
import { validateSchema } from '@utils/validateSchema';

const router = Router();

// Obtener una lista de libros con filtros opcionales
router.get('/', findBooks);

// Crear un nuevo libro (solo admin)
router.post('/', authMiddleware, adminMiddleware, bookSchema(), validateSchema, createBook);

// Actualizar un libro existente (solo admin)
router.put('/:id', authMiddleware, adminMiddleware, bookSchema(true), validateSchema, updateBook);

// Eliminar un libro (solo admin)
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

export default router;
