import { NextFunction, Response } from 'express';

import { tokenService, userService } from '../services';
import { IRequestExtended } from '../interfaces';
import { tokenRepository } from '../repositories/token/tokenRepository';

class AuthMiddleware {
    public async checkAccessToken(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const accessToken = req.get('Authorization');

            if (!accessToken) {
                throw new Error('No token');
            }

            const { userEmail } = tokenService.verifyToken(accessToken);

            const tokenPairFromDB = await tokenRepository.findByParams({accessToken});

            if (!tokenPairFromDB) {
                throw new Error('Token not valid');
            }

            const userFromToken = await userService.getUserByEmail(userEmail);

            if (!userFromToken) {
                throw new Error('Token not valid');
            }

            req.user = userFromToken;

            next();
        } catch (e: any) {
            res.json({
                status: 400,
                message: e.message,
            });
        }
    }
}

export const authMiddleware = new AuthMiddleware();
