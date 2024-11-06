import { checkSchema } from 'express-validator';

const loginSchema = checkSchema({
    email: {
        isEmail: {
            errorMessage: 'Debe ser un correo electrónico válido',
        },
        notEmpty: {
            errorMessage: 'El correo electrónico es obligatorio',
        },
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'La contraseña debe tener al menos 6 caracteres',
        },
        notEmpty: {
            errorMessage: 'La contraseña es obligatoria',
        },
    },
});

export  default loginSchema;
