import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtTokenGeneratorService } from 'src/common/helpers/JwtTokenGeneratorService';
import { MailModule } from '../mail/mail.module';
import { PasswordController } from './password.controller';
import { PasswordService } from './password.service';
import { Password, PasswordSchema } from './schema/password.schema';

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
