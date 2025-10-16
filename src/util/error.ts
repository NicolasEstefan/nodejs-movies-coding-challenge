export enum ErrorCode {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500
}

export class APIError extends Error {
  declare errorCode: ErrorCode
  declare errorData: object | null

  constructor(errorCode: ErrorCode, message: string, errorData?: object) {
    super(message)

    this.errorCode = errorCode
    this.errorData = errorData ?? null
  }

  json() {
    return {
      errorMessage: this.message,
      errorData: this.errorData
    }
  }
}
