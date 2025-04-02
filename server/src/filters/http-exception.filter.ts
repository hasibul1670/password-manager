import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse();

      return response.status(status).json({
        status: 'error',
        code: status,
        message,
      });
    }

    // Handle unexpected errors
    return response.status(500).json({
      status: 'error',
      code: 500,
      message: 'Internal Server Error',
    });
  }
}
