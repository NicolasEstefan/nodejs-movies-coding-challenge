import { RefreshtokenRepository } from '../../repository/refresh-tokens'

export const logout = async (refreshToken: string) => {
  await RefreshtokenRepository.deleteById(refreshToken)
}
