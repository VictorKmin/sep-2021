import { Router } from 'express';

import { authController } from '../controller/authController';
import { authMiddleware, userMiddleware } from '../middlewares';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
// router.post('/refresh', authController.registration);

export const authRouter = router;
