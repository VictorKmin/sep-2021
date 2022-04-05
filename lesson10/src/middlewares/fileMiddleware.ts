import { IRequestExtended } from '../interfaces';
import { constants } from '../constants';
import { ErrorHandler } from '../error/ErrorHandler';

import { Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';

class FileMiddleware {
  async checkUserAvatar(req: IRequestExtended, res: Response, next: NextFunction) {
    try {
      console.log('__________________________________');
      console.log(req.files);
      console.log('__________________________________');

      if (!req.files?.avatar) {
        next();
        return;
      }

      const {name, size, mimetype} = req.files.avatar as UploadedFile;

      if (size > constants.PHOTO_MAX_SIZE) {
        next(new ErrorHandler(`File ${name} is too big`));
        return;
      }

      if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
        next(new ErrorHandler('Wrong file format'));
        return;
      }

      next()
    } catch (e) {
      next(e)
    }
  }
}

export const fileMiddleware = new FileMiddleware();
