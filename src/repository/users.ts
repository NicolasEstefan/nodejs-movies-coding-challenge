import User, { UserAttributes, UserCreationAttributes } from "../models/User"

const findByEmail = async (email: string) => {
  return await User.findOne({
    where: {
      email
    }
  })
}

const create = async (params: UserCreationAttributes): Promise<UserAttributes> => {
  return await User.create(params)
}

export const UsersRepository = {
  findByEmail,
  create
}