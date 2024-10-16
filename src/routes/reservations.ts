import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '@middlewares/auth';
import { createReservation, getReservations,updateReservation } from '@controllers/reservations.controller';

const router = Router();

// Crear una nueva reserva
router.post('/', authMiddleware, createReservation );

// Obtener las reservas del usuario autenticado
router.get('/user', authMiddleware, getReservations);

// Actualizar el estado de una reserva (solo admin)
router.put('/:id', authMiddleware, adminMiddleware,updateReservation);

export default router;
