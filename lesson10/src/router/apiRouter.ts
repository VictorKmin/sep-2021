import { Router } from 'express';

import { userRouter } from './userRouter';
import { authRouter } from './authRouter';

const router = Router();

router.use('/users', userRouter);
router.use('/auth', authRouter);
// @ts-ignore
router.use('*', (err, req, res, next) => {

  console.log('___________________________________');
  console.log(err);
  console.log('___________________________________');

  res
    .status(err.code || 500)
    .json({
      message: err.message,
      data: err.data
    })
})

export const apiRouter = router;
