import { Router } from 'express';
import { authMiddleware, adminMiddleware } from '@middlewares/auth';
import { createReservation, getReservations,updateReservation } from '@controllers/reservations.controller';
import reservationSchema from '@schemas/reservation.schema';
import { validateSchema } from '@utils/validateSchema';

const router = Router();

// Crear una nueva reserva
router.post('/', authMiddleware, reservationSchema(), validateSchema, createReservation );

// Obtener las reservas del usuario autenticado
router.get('/user', authMiddleware, getReservations);

// Actualizar el estado de una reserva (solo admin)
router.put('/:id', authMiddleware, adminMiddleware, reservationSchema(true), validateSchema, updateReservation);

export default router;
