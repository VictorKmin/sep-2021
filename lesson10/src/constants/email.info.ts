import { emailActionEnum } from './enums';

export const emailInfo = {
  [emailActionEnum.WELCOME]: {
    subject: 'Welcome to SEP-2021',
    html: 'Hello this is welcome mail'
  },

  [emailActionEnum.ACCOUNT_BLOCKED]: {
    subject: 'You account was blocked',
    html: 'Opps account was blocked'
  }
}
