import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import * as path from 'path';

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: 'smtp.gmail.com',
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASSWORD,
                },
            },
            defaults: {
                from: '"Password App" <" <EMAIL>',
            },
            template: {
                // dir: process.cwd() + '/src/common/template/',
                dir: path.join(process.cwd(), '/src/common/template/'), // Use process.cwd() for consistent root path
                adapter: new PugAdapter(),
                options: {
                    strict: true,
                },
            },
        }),
    ],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }