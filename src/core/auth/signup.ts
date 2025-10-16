import { UserAttributes } from "../../models/User";
import { UsersRepository } from "../../repository/users";
import { SignupParams } from "../../schemas/auth";
import { APIError, ErrorCode } from "../../util/error";
import bcrypt from 'bcrypt'

export const signup = async (params: SignupParams): Promise<UserAttributes> => {

  const existingUser = await UsersRepository.findByEmail(params.email)

  if (existingUser) {
    throw new APIError(ErrorCode.CONFLICT, 'Email already in use')
  }

  const passwordHash = await bcrypt.hash(params.password, 10)

  const user = await UsersRepository.create({
    ...params,
    password: passwordHash
  })

  return user
}