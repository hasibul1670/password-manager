import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { Password, PasswordSchema } from './schema/password.schema';
import { MailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Password.name, schema: PasswordSchema },
    ]),
    MailModule
  ],
  controllers: [PasswordController],
  providers: [PasswordService],
})
export class PasswordModule { }
