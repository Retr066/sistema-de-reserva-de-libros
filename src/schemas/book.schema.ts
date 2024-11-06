import { checkSchema } from 'express-validator';

const bookSchema = (isUpdate = false) => checkSchema({
    title: {
        notEmpty: {
            errorMessage: 'El título es obligatorio',
        },
        isString: {
            errorMessage: 'El título debe ser un texto válido',
        },
        isLength: {
            options: { min: 4 },
            errorMessage: 'El título debe tener al menos 4 caracteres',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    author: {
        notEmpty: {
            errorMessage: 'El autor es obligatorio',
        },
        isString: {
            errorMessage: 'El autor debe ser un texto válido',
        },
        isLength: {
            options: { min: 4 },
            errorMessage: 'El autor debe tener al menos 4 caracteres',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    category: {
        notEmpty: {
            errorMessage: 'La categoría es obligatoria',
        },
        isString: {
            errorMessage: 'La categoría debe ser un texto válido',
        },
        isLength: {
            options: { min: 4 },
            errorMessage: 'La categoría debe tener al menos 4 caracteres',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    isbn: {
        notEmpty: {
            errorMessage: 'El ISBN es obligatorio',
        },
        isString: {
            errorMessage: 'El ISBN debe ser un texto válido',
        },
        isLength: {
            options: { min: 10, max: 13 },
            errorMessage: 'El ISBN debe tener entre 10 y 13 caracteres',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    publicationDate: {
        notEmpty: {
            errorMessage: 'La fecha de publicación es obligatoria',
        },
        isDate: {
            errorMessage: 'La fecha de publicación debe ser una fecha válida',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    quantity: {
        notEmpty: {
            errorMessage: 'La cantidad es obligatoria',
        },
        isInt: {
            options: { min: 10 },
            errorMessage: 'La cantidad debe ser un número entero igual o mayor a 10',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    availableQuantity: {
        notEmpty: {
            errorMessage: 'La cantidad disponible es obligatoria',
        },
        isInt: {
            options: { min: 4 },
            errorMessage: 'La cantidad disponible debe ser un número entero igual o mayor a 4',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    'location.shelf': {
        notEmpty: {
            errorMessage: 'El estante es obligatorio',
        },
        isString: {
            errorMessage: 'El estante debe ser un texto válido',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    'location.aisle': {
        notEmpty: {
            errorMessage: 'El pasillo es obligatorio',
        },
        isString: {
            errorMessage: 'El pasillo debe ser un texto válido',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
});

export default bookSchema;
