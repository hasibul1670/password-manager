import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { isLoggedOut } from 'src/middleware/isLoggedOut';
import { JwtTokenGeneratorService } from '../../helpers/JwtTokenGeneratorService/JwtTokenGeneratorService';
import { bcryptPasword } from '../../helpers/bcryptPasword/bcryptPasword';
import { isLoggedIn } from '../../middleware/isLoggedIn';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
@Module({
  controllers: [AuthController],
  providers: [AuthService, bcryptPasword, JwtService, JwtTokenGeneratorService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(isLoggedIn)
      .forRoutes(
        { path: 'auth/admin-login', method: RequestMethod.POST },
        { path: 'auth/super-admin-login', method: RequestMethod.POST },
      );

    consumer
      .apply(isLoggedOut)
      .forRoutes({ path: 'auth/logout', method: RequestMethod.POST });
  }
}
