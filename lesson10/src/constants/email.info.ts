import { emailActionEnum } from './enums';

export const emailInfo = {
  [emailActionEnum.WELCOME]: {
    subject: 'Welcome to SEP-2021',
    templateName: 'welcome'
  },

  [emailActionEnum.ACCOUNT_BLOCKED]: {
    subject: 'You account was blocked',
    templateName: 'accountBlocked'
  }
}
