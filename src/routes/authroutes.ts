import { Router } from 'express';
import AuthController from '../controllers/authController';
import AuthMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/auth/register', AuthController.registerUser);
router.post('/auth/login', AuthController.loginUser);
router.get('/user/:id', AuthMiddleware.authentication, AuthController.getUserById);

export default router;  
