import { UsersRepository } from '../../repository/users'
import { LoginParams } from '../../schemas/auth'
import { APIError, ErrorCode } from '../../util/error'
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from './token'
import { RefreshtokenRepository } from '../../repository/refresh-tokens'

export type LoginResult = {
  accessToken: {
    token: string
    maxAgeSeconds: number
  }
  refreshToken: {
    token: string
    maxAgeSeconds: number
  }
}

export const login = async (params: LoginParams): Promise<LoginResult> => {
  const user = await UsersRepository.findByEmail(params.email)
  if (!user) {
    throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
  }

  const match = await bcrypt.compare(params.password, user.password)

  if (!match) {
    throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
  }

  return {
    accessToken: generateAccessToken(user.id),
    refreshToken: await generateRefreshToken(user.id),
  }
}
