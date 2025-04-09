import { Module } from '@nestjs/common';
import { MailModule } from '../mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PasswordService } from './password.service';
import { PasswordController } from './password.controller';
import { Password, PasswordSchema } from './schema/password.schema';
import { JwtTokenGeneratorService } from '../../common/helpers/JwtTokenGeneratorService';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Password.name, schema: PasswordSchema },
    ]),
    MailModule],
  controllers: [PasswordController],
  providers: [PasswordService, JwtTokenGeneratorService],
})
export class PasswordModule { }
