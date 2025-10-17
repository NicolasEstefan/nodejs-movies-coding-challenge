import { RefreshtokenRepository } from '../../repository/refresh-tokens'
import jwt from 'jsonwebtoken'
import { APIError, ErrorCode } from '../../util/error'

export const logout = async (refreshToken: string) => {
  try {
    const payload = jwt.verify(
      refreshToken,
      process.env.SERVER_SECRET!
    ) as Record<string, string>

    await RefreshtokenRepository.deleteById(payload.refreshToken)
  } catch {
    throw new APIError(ErrorCode.UNAUTHORIZED, 'Invalid credentials')
  }
}
