import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';


@Injectable()
export class isLoggedIn implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const loggedInCookie = req.cookies['refreshToken'];
    if (loggedInCookie) {
      return res.status(403).json({
        message: 'User is already logged in',
      });
    }

    // Proceed to the next middleware/controller
    next();
  }
}
