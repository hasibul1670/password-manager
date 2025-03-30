import { HttpException } from '@nestjs/common';
import { ApiResponse } from '../../interface/common/apiResponse';

export function ApiError(
  statusCode?: any,
  message?: string,
  errorMessage?: string,
): HttpException {
  const errorResponse: ApiResponse<null> = {
    status: false,
    statusCode: statusCode,
    message: message,
    error: errorMessage,
  };
  return new HttpException(errorResponse, statusCode);
}
