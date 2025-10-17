import { NextFunction, Request, Response } from 'express'
import { search as searchCore } from '../../../core/movies/search'
import { SearchMoviesParams } from '../../../schemas/movies'

export const search = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await searchCore(req.validatedQuery as SearchMoviesParams)
    res.json(result)
  } catch (error) {
    next(error)
  }
}
