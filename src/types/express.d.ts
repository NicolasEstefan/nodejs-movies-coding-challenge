import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    validatedQuery?: Record<string, unknown>
    validatedParams?: Record<string, unknown>
    validatedBody?: Record<string, unknown>
    validatedHeaders?: Record<string, unknown>
    validatedCookies?: Record<string, unknown>
    userId?: string
  }
}
