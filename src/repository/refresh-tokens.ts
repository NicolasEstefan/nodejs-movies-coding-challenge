import { Transaction } from 'sequelize'
import RefreshToken, {
  RefreshTokenAttributes,
  RefreshTokenCreationAttributes,
} from '../models/RefreshToken'

const create = async (
  params: RefreshTokenCreationAttributes,
  transaction?: Transaction
): Promise<RefreshTokenAttributes> => {
  return await RefreshToken.create(params, {
    transaction,
  })
}

const findById = async (id: string): Promise<RefreshTokenAttributes | null> => {
  return await RefreshToken.findByPk(id)
}

const deleteById = async (id: string, transaction?: Transaction) => {
  await RefreshToken.destroy({
    where: {
      id,
    },
    transaction,
  })
}

export const RefreshtokenRepository = {
  create,
  findById,
  deleteById,
}
