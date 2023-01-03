import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `${this.configService.get(
      'PROTOCOL',
    )}://${this.configService.get(
      'URL',
    )}/users/emailVerification/${encodeURIComponent(token)}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmMail',
      context: {
        url,
        discordInvite: this.configService.get('DISCORD_INVITE_URL'),
      },
    });
  }
}
