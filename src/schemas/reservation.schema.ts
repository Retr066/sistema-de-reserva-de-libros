import { checkSchema } from 'express-validator';

const reservationSchema = (isUpdate = false) => checkSchema({
    reservationDate: {
        notEmpty: {
            errorMessage: 'La fecha de reserva es obligatoria',
        },
        isDate: {
            errorMessage: 'La fecha de reserva debe ser una fecha válida',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    dueDate: {
        notEmpty: {
            errorMessage: 'La fecha de vencimiento es obligatoria',
        },
        isDate: {
            errorMessage: 'La fecha de vencimiento debe ser una fecha válida',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
});

export default reservationSchema;
