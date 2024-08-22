interface AuthSuccessResponse {
  access_token: string;
}

interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
