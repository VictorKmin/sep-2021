import { Router } from 'express';
import { authController } from '../controller/authController';

const router = Router();

router.post('/registration', authController.registration);
// router.post('/login', authController.registration);
// router.post('/logout', authController.registration);
// router.post('/refresh', authController.registration);

export const authRouter = router;
