import express from 'express'
import { search } from './search'
import { authenticate } from '../../middleware/authenticate'
import { validate } from '../../middleware/validate'
import { searchMoviesValidationSchema } from '../../../schemas/movies'

const router = express.Router()

router.get(
  '/search',
  authenticate,
  validate(searchMoviesValidationSchema),
  search
)

export default router
