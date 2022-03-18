import { Request, Response } from 'express';

import { authService, tokenService, userService } from '../services';

import { COOKIE } from '../constants/cookie';
import { ITokenData, IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';

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

        await tokenService.deleteUserTokenPair(id);

        return res.json('Ok');
    }

    async login(req: IRequestExtended, res: Response) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await userService.compareUserPasswords(password, hashPassword);

            const {refreshToken, accessToken} = tokenService.generateTokenPair({userId: id, userEmail: email});

            await tokenRepository.createToken({refreshToken, accessToken, userId: id});

            res.json({
                refreshToken,
                accessToken,
                user: req.user
            });
        } catch (e) {
            res.status(400).json(e);
        }
    }
}

export const authController = new AuthController();
