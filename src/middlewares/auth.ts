import configENV from "@config/configEnv";
import { AuthenticatedRequest, JwtPayload } from "@interfaces/auth.interface";
import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';



const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Se requiere autenticación' });
  }

  try {
    const decoded = jwt.verify(token, configENV.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

const adminMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Se requiere acceso de administrador' });
  }
  next();
};

export { authMiddleware, adminMiddleware };
