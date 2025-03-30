export interface ApiResponse<T> {
  status?: any;
  message?: string;
  statusCode?: any;
  data?: T;
  error?: any;
}
