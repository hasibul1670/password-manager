import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class isLoggedOut implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggedInCookie = req.cookies['refresh_token'];

    if (!loggedInCookie) {
      throw new ForbiddenException(
        'User is already logged Out !! Please Logged In',
      );
    }

    next();
  }
}
