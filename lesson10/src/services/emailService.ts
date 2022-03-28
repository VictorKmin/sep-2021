import nodemailer, { SentMessageInfo } from 'nodemailer';
import EmailTemplate from 'email-templates';

import { config } from '../config/config';
import { emailActionEnum, emailInfo } from '../constants';
import path from 'path';

class EmailService {

  templateRenderer = new EmailTemplate({
    views: {
      // @ts-ignore
      root: path.join(__dirname, '../', 'email-templates')
    }
  });

  async sendMail(userMail: string, action: emailActionEnum, context = {}): Promise<SentMessageInfo> {
    // let path2 = 'src';
    //
    // if (NODE_ENV === 'prod') {
    //   path2 = 'dist';
    // }
    //
    // const templateRenderer = new EmailTemplate({
    //   views: {
    //     // @ts-ignore
    //     root: path.join(global.rootDir, path2, 'email-templates')
    //   }
    // });
    //
    // const rootDir = path.join(__dirname, '../');
    // console.log(__dirname);
    // // @ts-ignore
    // console.log(global.rootDir, 'ROOOOOOOOOT');
    // console.log(rootDir, 'THIS THIS ROOOOOOOOOT');

    const {subject, templateName} = emailInfo[action];

    Object.assign(context, {frontendUrl: 'https://google.com'});

    const html = await this.templateRenderer.render(templateName, context);

    const emailTransporter = nodemailer.createTransport({
      from: 'No Reply Sep-2021',
      service: 'gmail',
      auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD
      }
    });

    return emailTransporter.sendMail({
      to: userMail,
      subject,
      html
    });
  }
}

export const emailService = new EmailService();
