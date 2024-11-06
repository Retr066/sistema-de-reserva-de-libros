import { checkSchema } from 'express-validator';

const registerSchema = (isUpdate = false) => checkSchema({
    name: {
        notEmpty: {
            errorMessage: 'El nombre es obligatorio',
        },
        isString: {
            errorMessage: 'El nombre debe ser un texto válido',
        },
        isLength: {
            options: { min: 2 },
            errorMessage: 'El nombre debe tener al menos 2 caracteres',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    email: {
        isEmail: {
            errorMessage: 'Debe ser un correo electrónico válido',
        },
        notEmpty: {
            errorMessage: 'El correo electrónico es obligatorio',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
        /*   custom:{
               //validar que el domini sea de la universidad @yachayhuasi.edu.pe
               options: (value) => {
                   if(value.includes('@yachayhuasi.edu.pe')){
                       return true;
                   }else{
                       throw new Error('El correo debe ser de la universidad Yachayhuasi');
                   }
               }
           } */
    },
    password: {
        isLength: {
            options: { min: 6 },
            errorMessage: 'La contraseña debe tener al menos 6 caracteres',
        },
        notEmpty: {
            errorMessage: 'La contraseña es obligatoria',
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),
    },
    identificationNumber: {
        custom: {
            options: (value = '') => {
                if (value.match(/^[0-9]{8}$/)) {
                    return true;
                } else {
                    throw new Error('El número de identificación debe tener 8 dígitos');
                }
            }
        },
        ...(isUpdate && { optional: { options: { nullable: true } } }),

        // notEmpty: {
        //     errorMessage: 'El número de identificación es obligatorio',
        // },
        // isNumeric: {
        //     errorMessage: 'El número de identificación debe contener solo números',
        // },

        // isLength: {
        //     options: { min: 8, max: 20  },
        //     errorMessage: 'El número de identificación debe tener entre 8 y 20 dígitos',
        // },
        // 
    },
    
});

export default registerSchema;
