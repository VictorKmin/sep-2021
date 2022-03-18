import { Request } from 'express';

import { IUser } from '../entity/user';

export interface IRequestExtended extends Request {
  user?: IUser;
}
