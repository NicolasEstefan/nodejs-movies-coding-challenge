import { NextFunction, Request, Response } from 'express'
import { refresh as refreshCore } from '../../../core/auth/refresh'

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookies = req.validatedCookies as Record<string, string>
    const refreshResult = await refreshCore(cookies['refresh-token'])

    res.cookie('access-token', refreshResult.accessToken.token, {
      maxAge: refreshResult.accessToken.maxAgeSeconds * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    })

    res.send()
  } catch (error) {
    next(error)
  }
}
