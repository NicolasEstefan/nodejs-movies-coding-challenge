import { NextFunction, Request, Response } from 'express'
import { login as coreLogin } from '../../../core/auth/login'
import { LoginParams } from '../../../schemas/auth'

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginResult = await coreLogin(req.validatedBody as LoginParams)

    res.cookie('access-token', loginResult.accessToken.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: loginResult.accessToken.maxAgeSeconds * 1000,
    })

    res.cookie('refresh-token', loginResult.refreshToken.token, {
      httpOnly: true,
      path: '/api/auth/refresh',
      secure: process.env.NODE_ENV === 'production',
      maxAge: loginResult.refreshToken.maxAgeSeconds * 1000,
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
