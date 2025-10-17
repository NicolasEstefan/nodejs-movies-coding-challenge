import express from 'express'
import { signup } from './signup'
import {
  loginValidationSchema,
  logoutValidationSchema,
  refreshValidationSchema,
  signupValidationSchema,
} from '../../../schemas/auth'
import { validate } from '../../middleware/validate'
import { login } from './login'
import { refresh } from './refresh'
import { logout } from './logout'

const router = express.Router()

router.post('/signup', validate(signupValidationSchema), signup)
router.post('/login', validate(loginValidationSchema), login)
router.post('/logout', validate(logoutValidationSchema), logout)
router.get('/refresh', validate(refreshValidationSchema), refresh)

export default router
