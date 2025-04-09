import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class isLoggedOut implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggedInCookie = req.cookies['refreshToken'];

    // If there is no refresh token, the user is logged out
    if (!loggedInCookie) {
      return res.status(403).json({
        message: 'User is already logged out! Please log in.',
      });
    }

    // Proceed to the next middleware/controller
    next();
  }
}
