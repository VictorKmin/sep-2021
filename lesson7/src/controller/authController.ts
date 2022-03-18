import { Request, Response } from 'express';

import { authService, tokenService } from '../services';

import { COOKIE } from '../constants/cookie';
import { ITokenData } from '../interfaces/token.interface';
import { IRequestExtended } from '../interfaces/requestExtended.interface';
import { IUser } from '../entity/user';

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

    async logout(req: IRequestExtended, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUser;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }
}

export const authController = new AuthController();
