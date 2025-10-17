import { NextFunction, Request, Response } from 'express'
import { APIError, ErrorCode } from '../../util/error'

export const notFoundHandler = (req: Request, res: Response) => {
  throw new APIError(ErrorCode.NOT_FOUND, 'Not found')
}

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let apiError: APIError

  if (err instanceof APIError) {
    apiError = err
  } else {
    apiError = new APIError(
      ErrorCode.INTERNAL_SERVER_ERROR,
      'Internal server error'
    )
  }

  res.status(apiError.errorCode).json(apiError.json())
}
