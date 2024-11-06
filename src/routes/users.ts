import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '@middlewares/auth';  // Importar los middlewares de autenticación
import { createUser, deleteUser, getProfile, getUsers, updateProfile, updateUser } from '@controllers/users.controller';
import registerSchema from '@schemas/register.schema';
import { validateSchema } from '@utils/validateSchema';

const router = Router();

// Obtener el perfil del usuario autenticado
router.get('/profile', authMiddleware, getProfile);

// Actualizar el perfil del usuario autenticado
router.put('/profile', authMiddleware, registerSchema(true), validateSchema, updateProfile);

// Obtener todos los usuarios (solo admin)
router.get('/', authMiddleware, adminMiddleware, getUsers);

// Crear un nuevo usuario (solo admin)
router.post('/', authMiddleware, adminMiddleware, registerSchema(), validateSchema, createUser);

// Actualizar un usuario (solo admin)
router.put('/:id', authMiddleware, adminMiddleware, registerSchema(true), validateSchema, updateUser);

// Eliminar un usuario (solo admin)
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

export default router;
