import 'express'

declare module 'express-serve-static-core' {
  interface Request {
    isBrowser?: boolean
    validatedQuery?: Record<string, unknown>
    validatedParams?: Record<string, unknown>
    validatedBody?: Record<string, unknown>
    validatedHeaders?: Record<string, unknown>
  }
}
