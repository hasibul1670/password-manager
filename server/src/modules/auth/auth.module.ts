import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { isLoggedIn } from 'src/common/middleware/isLoggedIn';
import { isLoggedOut } from 'src/common/middleware/isLoggedOut';
import { JwtTokenGeneratorService } from '../../common/helpers/JwtTokenGeneratorService';
import { bcryptPassword } from '../../common/helpers/bcryptPassword';
import { MailModule } from '../mail/mail.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './schema/auth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Auth.name, schema: AuthSchema },
    ]),
    MailModule
  ],
  controllers: [AuthController],
  providers: [AuthService, bcryptPassword, JwtService, JwtTokenGeneratorService],
})


export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isLoggedIn)
      .forRoutes(
        { path: 'auth/send-otp', method: RequestMethod.POST },
        { path: 'auth/verify-otp', method: RequestMethod.POST },
      );

    consumer
      .apply(isLoggedOut)
      .forRoutes({ path: 'auth/logout', method: RequestMethod.POST });
  }
}
