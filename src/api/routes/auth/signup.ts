import { NextFunction, Request, Response } from "express";
import { signup as coreSignup } from '../../../core/auth/signup'

export const signup = async (req: Request, res: Response, next: NextFunction) => {

  try {
    await coreSignup(req.body)
    res.status(201).send()
  } catch (error) {
    next(error)
  }

}