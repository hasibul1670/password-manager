import { ApiResponse } from 'src/interface/common/apiResponse';

export function createApiResponse<T>(
  status: 'success' | 'error',
  statusCode: number,
  message: string,
  data?: T,
): ApiResponse<T> {
  return {
    status,
    statusCode,
    message,
    data: data || null,
  };
}
