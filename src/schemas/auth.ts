import z from 'zod'

export const signupValidationSchema = {
  body: z.object({
    email: z.email(),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(255),
    name: z.string().nonempty().max(255),
  }),
}
export type SignupParams = z.infer<typeof signupValidationSchema.body>

export const loginValidationSchema = {
  body: z.object({
    email: z.email(),
    password: z.string(),
  }),
}

export type LoginParams = z.infer<typeof loginValidationSchema.body>
