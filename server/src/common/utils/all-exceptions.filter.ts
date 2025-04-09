import {
  Catch,
  ArgumentsHost,
  HttpException,
  ExceptionFilter,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // Check if headers are already sent
    if (!response.headersSent) {
      response.status(status).json({
        statusCode: status,
        message: exception.message,
      });
    }
  }
}
