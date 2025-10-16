import db from '../util/db'
import User from './User'
import RefreshToken from './RefreshToken'

User.associate()
RefreshToken.associate()

export { User, RefreshToken }
