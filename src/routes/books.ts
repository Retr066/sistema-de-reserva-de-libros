import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '@middlewares/auth';
import { createBook, deleteBook, findBooks, updateBook } from '@controllers/books.controller';

const router = Router();

// Obtener una lista de libros con filtros opcionales
router.get('/', findBooks);

// Crear un nuevo libro (solo admin)
router.post('/', authMiddleware, adminMiddleware, createBook);

// Actualizar un libro existente (solo admin)
router.put('/:id', authMiddleware, adminMiddleware, updateBook);

// Eliminar un libro (solo admin)
router.delete('/:id', authMiddleware, adminMiddleware, deleteBook);

export default router;
