export class ResponseHelper {
  static success(data: SuccessResponse) {
    return {
      ...data,
      error: false,
    } as SuccessResponse;
  }

  static error(data: ErrorResponse) {
    return {
      ...data,
      error: true,
    } as ErrorResponse;
  }
}

export type SuccessResponse = {
  message?: string;
  data?: any;
  error?: boolean;
};

export type ErrorResponse = {
  message?: string;
  data?: any;
  error?: boolean;
};
