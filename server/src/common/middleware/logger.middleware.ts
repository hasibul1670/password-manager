import morgan from 'morgan';
import { NextFunction, Request, Response } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = morgan('dev');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger(req, res, next);
  }
}
