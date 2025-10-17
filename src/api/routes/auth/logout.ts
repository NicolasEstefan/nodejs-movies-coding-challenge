import { NextFunction, Request, Response } from 'express'
import { logout as logoutCore } from '../../../core/auth/logout'

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.validatedCookies?.['refresh-token']) {
      await logoutCore(req.validatedCookies['refresh-token'] as string)
    }

    res.clearCookie('access-token')
    res.clearCookie('refresh-token', {
      path: '/api/auth/refresh',
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
