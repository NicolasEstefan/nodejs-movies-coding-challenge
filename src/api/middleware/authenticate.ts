import { NextFunction, Request, Response } from 'express'
import { APIError, ErrorCode } from '../../util/error'
import jwt from 'jsonwebtoken'

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies['access-token']) {
    throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
  }

  try {
    const payload = jwt.verify(
      req.cookies['access-token'],
      process.env.SERVER_SECRET!
    ) as Record<string, string>

    req.userId = payload.userId

    next()
  } catch {
    throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
  }
}
