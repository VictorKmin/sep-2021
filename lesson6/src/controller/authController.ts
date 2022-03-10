import { Request, Response } from 'express';

import { authService } from '../services/authService';
import { COOKIE } from '../constants/cookie';
import { ITokenData } from '../interfaces/token.interface';

class AuthController {
    public async registration(req: Request, res: Response): Promise<Response<ITokenData>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );

        return res.json(data);
    }
}

export const authController = new AuthController();
