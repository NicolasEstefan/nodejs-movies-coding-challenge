import express from 'express'
import { search } from './search'
import { authenticate } from '../../middleware/authenticate'

const router = express.Router()

router.get('/search', authenticate, search)

export default router
