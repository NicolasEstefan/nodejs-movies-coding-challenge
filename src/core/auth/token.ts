import jwt from 'jsonwebtoken'

export const generateAccessToken = (userId: string) => {
  const maxAgeSeconds = 60 * 3 // 3 minutes
  return {
    token: jwt.sign({ userId }, process.env.SERVER_SECRET!, {
      expiresIn: maxAgeSeconds,
    }),
    maxAgeSeconds,
  }
}

export const generateRefreshToken = (refreshTokenId: string) => {
  const maxAgeSeconds = 60 * 60 * 24 * 7 // 7 days

  return {
    token: jwt.sign({ refreshTokenId }, process.env.SERVER_SECRET!, {
      expiresIn: maxAgeSeconds,
    }),
    maxAgeSeconds,
  }
}
