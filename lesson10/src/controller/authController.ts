import { NextFunction, Request, Response } from 'express';

import { authService, emailService, s3Service, tokenService, userService } from '../services';
import { emailActionEnum } from '../constants';
import { IRequestExtended } from '../interfaces';
import { IUser } from '../entity/user';
import { tokenRepository } from '../repositories/token/tokenRepository';
import { UploadedFile } from 'express-fileupload';

class AuthController {
    public async registration(req: Request, res: Response, next: NextFunction): Promise<void> {
        //{
        //     "firstName": "Dima",
        //     "lastName": "Petriv",
        //     "phone": "+380676767674",
        //     "password": "1234567890",
        //     "email": "email33@email.com",
        //     "age": 95
        // }

        try {
            const { email } = req.body;
            const avatar = req.files?.avatar as UploadedFile;

            const userFromDb = await userService.getUserByEmail(email);

            if (userFromDb) {
                throw new Error(`User with email: ${email} already exists`);
            }

            const createdUser = await userService.createUser(req.body);

            if (avatar) {
                const sendData = await s3Service.uploadFile(avatar, 'user', createdUser.id);

                console.log('___________________________________________________');
                console.log(sendData.Location);
                console.log('___________________________________________________');

                // UPDATE USER
            }

            const tokenData = await authService.registration(createdUser);

            res.json(tokenData);
        } catch (e) {
            next(e)
        }
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
