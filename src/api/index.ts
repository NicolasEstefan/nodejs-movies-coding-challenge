import express from 'express'
import authRouter from './routes/auth'
import moviesRouter from './routes/movies'

const router = express.Router()

router.use('/auth', authRouter)
router.use('/movies', moviesRouter)

export default router
