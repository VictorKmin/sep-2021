import * as Joi from 'joi';

import { commonValidator } from '../common/common.validator';

export const authValidator = {
  login: Joi.object({
    email: commonValidator.emailValidator.message('Email not valid').trim(),
    password: Joi.string().required().min(8).message('Password not valid').trim()
  })
};
