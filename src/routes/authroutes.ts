import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();

router.post('/auth/register', AuthController.registerUser);

export default router;  
