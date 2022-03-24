import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../interfaces';
import { userRepository } from '../repositories/user/userRepository';
import { ErrorHandler } from '../error/ErrorHandler';

class UserMiddleware {
    async checkIsUserExist(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const userFromDB = await userRepository.getUserByEmail(req.body.email);

            if (!userFromDB) {
                next(new ErrorHandler('User not found', 404));
                return;
            }

            req.user = userFromDB;
            next();
        } catch (e) {
            next(e)
        }
    }
}

export const userMiddleware = new UserMiddleware();
