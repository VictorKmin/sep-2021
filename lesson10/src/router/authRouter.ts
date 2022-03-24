import { Router } from 'express';

import { authController } from '../controller/authController';
import { authMiddleware, userMiddleware } from '../middlewares';
import { celebrate } from 'celebrate';
import { authValidator } from '../validators';

const router = Router();

router.post('/registration', authController.registration);
router.post('/login', celebrate(authValidator.login), userMiddleware.checkIsUserExist, authController.login);
router.post('/logout', authMiddleware.checkAccessToken, authController.logout);
router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

export const authRouter = router;
