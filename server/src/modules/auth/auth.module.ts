import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { MailModule } from '../mail/mail.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { Auth, AuthSchema } from './schema/auth.schema';
import { isLoggedIn } from '../../common/middleware/isLoggedIn';
import { isLoggedOut } from '../../common/middleware/isLoggedOut';
import { bcryptPassword } from '../../common/helpers/bcryptPassword';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { JwtTokenGeneratorService } from '../../common/helpers/JwtTokenGeneratorService';

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
