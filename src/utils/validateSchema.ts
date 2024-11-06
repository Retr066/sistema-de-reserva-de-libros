import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const validateSchema =  (req: Request, res: Response, next: NextFunction) => {
    // Ejecutar el middleware de validación con el resultado
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        // Si hay errores, extraemos los mensajes y los devolvemos
        return res.status(400).json({ errors: errors.array() });
    };
    // Si no hay errores, seguimos con el siguiente middleware o controlador
    next();

};
