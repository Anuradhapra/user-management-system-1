// backend/src/routes/authRoutes.ts
import { Router } from 'express';
import { AuthController } from '../controller/AuthController';

const router = Router();

router.post('/signup', AuthController.signup); // Endpoint for user registration
router.post('/login', AuthController.login);   // Endpoint for user login

export default router;