import express from 'express'
import { signup } from './signup'
import {
  loginValidationSchema,
  signupValidationSchema,
} from '../../../schemas/auth'
import { validate } from '../../middleware/validate'
import { login } from './login'

const router = express.Router()

router.post('/signup', validate(signupValidationSchema), signup)
router.post('/login', validate(loginValidationSchema), login)

export default router
