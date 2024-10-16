import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '@middlewares/auth';  // Importar los middlewares de autenticación
import { createUser, deleteUser, getProfile, getUsers, updateProfile, updateUser } from '@controllers/users.controller';

const router = Router();

// Obtener el perfil del usuario autenticado
router.get('/profile', authMiddleware, getProfile);

// Actualizar el perfil del usuario autenticado
router.put('/profile', authMiddleware, updateProfile);

// Obtener todos los usuarios (solo admin)
router.get('/', authMiddleware, adminMiddleware, getUsers);

// Crear un nuevo usuario (solo admin)
router.post('/', authMiddleware, adminMiddleware, createUser);

// Actualizar un usuario (solo admin)
router.put('/:id', authMiddleware, adminMiddleware, updateUser);

// Eliminar un usuario (solo admin)
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
