import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = morgan('dev');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next);
  }
}
