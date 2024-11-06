import configENV from "@config/configEnv";
import { ErrorType } from "@enums/ErrorType";
import { SuccessType } from "@enums/SuccessType";
import { LoginRequest, LoginResponse, RegisterRequest } from "@interfaces/auth.interface";
import User, { IUser } from "@models/User";
import { handleResponse } from "@utils/createResponse";
import { handleError } from "@utils/handleError";
import { Response } from "express";
import jwt from 'jsonwebtoken';
import { DEFAULT_MESSAGE_ERROR } from "src/constants/defaultMessage";

const register = async (req: RegisterRequest, res: Response) => {
  try {
    const { name, email, password, identificationNumber } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      return handleError(res, 'El email ya está registrado', ErrorType.CONFLICT);
    }

    const findIdentification = await User.findOne({
      identificationNumber
    });

    if (findIdentification) {
      return handleError(res, 'El número de identificación ya está registrado', ErrorType.CONFLICT);
    }

    const user = new User({ name, email, password, identificationNumber });
    await user.save();
    return handleResponse<IUser>(res, 'Usuario registrado correctamente', SuccessType.CREATED, user);

  } catch (error: any) {
    const e = error as Error;
    console.log(e); //Hacer por un manejo de errores más robusto
    return handleError(res, DEFAULT_MESSAGE_ERROR , ErrorType.INTERNAL_ERROR);
  }
}


const login = async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return handleError(res, 'Credenciales incorrectas', ErrorType.FORBIDDEN);
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, configENV.JWT_SECRET, { expiresIn: '1d' });

    return handleResponse<LoginResponse>(res, 'Usuario autenticado correctamente', SuccessType.OK, { token, user });
  } catch (error: any) {
    const e = error as Error;
    console.log(e);
    return handleError(res, DEFAULT_MESSAGE_ERROR , ErrorType.INTERNAL_ERROR);
  }
}

export {
  register,
  login
}
