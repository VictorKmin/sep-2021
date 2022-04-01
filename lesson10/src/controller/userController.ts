import { NextFunction, Request, Response } from 'express';

import { IUser } from '../entity/user';
import { userService } from '../services';

class UserController {
    public async createUser(req: Request, res: Response): Promise<Response<IUser>> {
        const createdUser = await userService.createUser(req.body);
        return res.json(createdUser);
    }

    public async getUserByEmail(req: Request, res: Response): Promise<Response<IUser>> {
        const { email } = req.params;
        const user = await userService.getUserByEmail(email);
        return res.json(user);
    }

    public async getUserPagination(req: Request, res: Response, next: NextFunction) {
        try {
              // https://auto.ria.com/uk/search/?
              // categories.main.id=1&
              // price.currency=1&
              // price.USD.gte=2000&
              // price.USD.lte=9000&
              // indexName=auto,order_auto,newauto_search&
              // brand.id[0]=29&
              // model.id[0]=1268&
              // year[0].gte=2007&
              // year[0].lte=2019&
              // size=20
            const {page = 1, perPage = 25, ...other} = req.query;

            const userPagination = await userService.getUserPagination(other, +page, +perPage);

            res.json(userPagination);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();
