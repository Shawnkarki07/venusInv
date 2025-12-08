import { Router } from 'express';
import * as authController from '../controllers/authController';

const router = Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Protected routes (would need auth middleware)
// router.get('/profile', authMiddleware, authController.getProfile);

export default router;
