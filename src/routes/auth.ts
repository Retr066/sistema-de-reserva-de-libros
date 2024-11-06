import { Router } from 'express';
import { login, register } from '@controllers/auth.controller';
import loginSchema from '@schemas/login.schema';
import { validateSchema } from '@utils/validateSchema';
import registerSchema from '@schemas/register.schema';



const router = Router();

router.post('/register', registerSchema(), validateSchema , register);

router.post('/login',loginSchema, validateSchema , login);

export default router;
