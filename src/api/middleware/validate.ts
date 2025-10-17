import { NextFunction, Request, Response } from 'express'
import z, { ZodError, ZodObject, ZodType } from 'zod'
import { APIError, ErrorCode } from '../../util/error'

export type RequestValidationSchema = {
  body?: ZodObject
  query?: ZodObject
  headers?: ZodObject
  params?: ZodObject
  cookies?: ZodObject
}

export const validate = (
  validationSchema: RequestValidationSchema
): ((req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (validationSchema.body) {
        req.validatedBody = await validationSchema.body
          .strip()
          .parseAsync(req.body)
      }

      if (validationSchema.headers) {
        req.validatedHeaders = await validationSchema.headers
          .strip()
          .parseAsync(req.headers)
      }

      if (validationSchema.params) {
        req.validatedParams = await validationSchema.params
          .strip()
          .parseAsync(req.params)
      }

      if (validationSchema.query) {
        req.validatedQuery = await validationSchema.query
          .strip()
          .parseAsync(req.query)
      }

      if (validationSchema.cookies) {
        req.validatedCookies = await validationSchema.cookies
          .strip()
          .parseAsync(req.cookies)
      }

      next()
    } catch (error) {
      if (error instanceof ZodError) {
        throw new APIError(
          ErrorCode.BAD_REQUEST,
          'Validation error',
          error.issues
        )
      }

      next(error)
    }
  }
}
