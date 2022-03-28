import { NextFunction, Request, Response } from 'express';

import { authService, emailService, tokenService, userService } from '../services';

import { COOKIE, emailActionEnum } from '../constants';
import { IRequestExtended, ITokenData } from '../interfaces';
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

    async login(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { id, email, password: hashPassword } = req.user as IUser;
            const { password } = req.body;

            await emailService.sendMail(email, emailActionEnum.WELCOME, {userName: 'Nastya'});
            await userService.compareUserPasswords(password, hashPassword);

            const {refreshToken, accessToken} = tokenService.generateTokenPair({userId: id, userEmail: email});

            await tokenRepository.createToken({refreshToken, accessToken, userId: id});

            res.json({
                refreshToken,
                accessToken,
                user: req.user
            });
        } catch (e) {
            next(e);
        }
    }

  async refreshToken(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
        const { id, email } = req.user as IUser;
        const refreshTokenToDelete = req.get('Authorization');

        await tokenService.deleteTokenPairByParams({refreshToken: refreshTokenToDelete});

        const {accessToken, refreshToken} = await tokenService.generateTokenPair({userId: id, userEmail: email});

        await tokenRepository.createToken({refreshToken, accessToken, userId: id});

        res.json({
            refreshToken,
            accessToken,
            user: req.user
        });
    } catch (e) {
        next(e)
    }
  }
}

export const authController = new AuthController();
