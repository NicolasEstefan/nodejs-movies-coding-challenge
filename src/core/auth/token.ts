import jwt from 'jsonwebtoken'
import { RefreshtokenRepository } from '../../repository/refresh-tokens'
import dayjs from 'dayjs'

export const generateAccessToken = (userId: string) => {
  const maxAgeSeconds = 60 * 3 // 3 minutes
  return {
    token: jwt.sign({ userId }, process.env.SERVER_SECRET!, {
      expiresIn: maxAgeSeconds,
    }),
    maxAgeSeconds,
  }
}

export const generateRefreshToken = async (userId: string) => {
  const maxAgeSeconds = 60 * 60 * 24 * 7 // 7 days

  const refreshToken = await RefreshtokenRepository.create({
    userId,
    expiresAt: dayjs().add(maxAgeSeconds, 'seconds').toDate(),
  })

  return {
    token: jwt.sign(
      { refreshTokenId: refreshToken.id },
      process.env.SERVER_SECRET!,
      {
        expiresIn: maxAgeSeconds,
      }
    ),
    maxAgeSeconds,
  }
}
