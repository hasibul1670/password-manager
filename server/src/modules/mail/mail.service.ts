
// mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendWelcomeEmail(email: string, name: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Welcome to Our Platform!',
            template: 'welcome', 
            context: {
                name,
                date: new Date(),
            },
        });
    }

  
    async sendOtpEmail(email: string ,otp: string) {
        await this.mailerService.sendMail({
            to: email,
            subject: 'Your Verification Code',
            template: 'otp', 
            context: {
                otp,
                expiryMinutes: 2, 
                date: new Date(),
            },
        });
    }

 
  
}