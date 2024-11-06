import { Request } from "express";
import User, { IUser } from '@models/User';

export interface AuthenticatedRequest extends Request {
    user?: JwtPayload;
  }

export interface JwtPayload {
    userId: string;
    role: 'user' | 'admin';
  }


export interface LoginRequest extends Request {
    body: {
        email: string;
        password: string;
    }
}

export interface LoginResponse {
    token: string;
    user: IUser;
}

export interface RegisterRequest extends Request {
    body: {
        name: string;
        email: string;
        password: string;
        identificationNumber: string;
    }
}


