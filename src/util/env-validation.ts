import z, { ZodError } from 'zod'

const envVars = z.object({
  PORT: z.string().nonempty(),
  DB_HOST: z.string().nonempty(),
  DB_USERNAME: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
  DB_NAME: z.string().nonempty(),
  DB_PORT: z.string().nonempty(),
  CACHE_PORT: z.string().nonempty(),
  SERVER_SECRET: z.string().nonempty(),
})

const validateEnv = () => {
  try {
    envVars.parse(process.env)
  } catch (error) {
    console.log('Missing required environment variables!')
    if (!(error instanceof ZodError)) {
      return
    }
    console.log(error.issues.map((issue) => issue.path))
    process.exit(-1)
  }
}

export default validateEnv
