import { NextFunction, Request, Response } from 'express'
import { login as coreLogin } from '../../../core/auth/login'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginResult = await coreLogin(req.body)

    res.cookie('access-token', loginResult.accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: loginResult.accessToken.maxAgeSeconds * 1000,
    })

    res.cookie('refresh-token', loginResult.refreshToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: loginResult.refreshToken.maxAgeSeconds * 1000,
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
