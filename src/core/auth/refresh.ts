import { RefreshtokenRepository } from '../../repository/refresh-tokens'
import jwt from 'jsonwebtoken'
import { APIError, ErrorCode } from '../../util/error'
import { generateAccessToken } from './token'

export type RefreshResult = {
  accessToken: {
    token: string
    maxAgeSeconds: number
  }
}

export const refresh = async (refreshToken: string): Promise<RefreshResult> => {
  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.SERVER_SECRET!
    ) as Record<string, string>

    const dbToken = await RefreshtokenRepository.findById(
      payload.refreshTokenId
    )

    if (!dbToken) {
      throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
    }

    return {
      accessToken: generateAccessToken(dbToken.userId),
    }
  } catch (error) {
    throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
  }
}
