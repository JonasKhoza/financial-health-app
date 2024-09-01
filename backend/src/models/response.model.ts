interface ResponseI {
  success: boolean;
  data?: any;
  metadata?: any;
  error?: {
    code: number;
    message: string;
    details?: any;
  };
}

class CustomError extends Error {
  public code: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.code = statusCode;
  }
}

class ResponseStructure {
  public success: boolean;
  public data?: any;
  public metadata?: any;
  public error?: {
    code: number;
    message: string;
  };

  constructor(
    s: boolean,
    d?: any,
    mt?: any,
    err?: {
      code: number;
      message: string;
      details?: any;
    }
  ) {
    (this.success = s),
      (this.data = d),
      (this.metadata = mt),
      (this.error = err);
  }
}

export { ResponseI, ResponseStructure, CustomError };
