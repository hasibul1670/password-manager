import { ApiResponse } from "../interface/apiResponse";


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
