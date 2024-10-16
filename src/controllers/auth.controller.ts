import configENV from "@config/configEnv";
import { ErrorType } from "@enums/ErrorType";
import {SuccessType} from "@enums/SuccessType";
import User from "@models/User";
import createSuccessResponse from "@utils/createResponse";
import { handleHttp } from "@utils/handleError";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, identificationNumber } = req.body;
        const user = new User({ name, email, password, identificationNumber });
        await user.save();
        const response =  createSuccessResponse(user, 'Usuario registrado correctamente');
        res.status(SuccessType.CREATED).json(response);
      } catch (error: any) {
        const e = error as Error;
        handleHttp(res, ErrorType.BAD_REQUEST, e.message);
      }
}


const login = async (req:Request, res:Response) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }
      const token = jwt.sign({ userId: user._id, role: user.role }, configENV.JWT_SECRET, { expiresIn: '1d' });
      res.json({ token });
    } catch (error : any) {
      const e = error as Error;
      handleHttp(res, ErrorType.INTERNAL_ERROR, e.message);
    }
  }

export {
    register,
    login
}
