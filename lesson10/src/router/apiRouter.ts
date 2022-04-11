import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { studentRouter } from './studentRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);

export const apiRouter = router;
