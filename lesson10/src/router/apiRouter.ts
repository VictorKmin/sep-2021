import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
import { studentRouter } from './studentRouter';
import docs from '../docs/swagger.json';

const router = Router();

router.use('/docs', swaggerUI.serve, swaggerUI.setup(docs));
router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/students', studentRouter);

export const apiRouter = router;
