import express from 'express'
import validateEnv from './util/env-validation'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import router from './api'
import { errorHandler, notFoundHandler } from './api/middleware/error-handler'
import db from './util/db'

validateEnv()

const server = express()

server.use(cookieParser())

server.use('/api', express.json())

server.use('/api', router)

server.use(notFoundHandler)

server.use(errorHandler)

// This is only for prototyping, migrations would be needed for a larger project
db.sync({ force: true }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
  })
})
