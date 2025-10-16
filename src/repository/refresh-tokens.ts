import RefreshToken, {
  RefreshTokenAttributes,
  RefreshTokenCreationAttributes,
} from '../models/RefreshToken'

const create = async (
  params: RefreshTokenCreationAttributes
): Promise<RefreshTokenAttributes> => {
  return await RefreshToken.create(params)
}

export const RefreshtokenRepository = {
  create,
}
