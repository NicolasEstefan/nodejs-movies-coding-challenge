import { NextFunction, Request, Response } from 'express'

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.send()
  } catch (error) {
    next(error)
  }
}
