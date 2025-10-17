import {
  Attributes,
  CreationAttributes,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize'
import User from './User'
import db from '../util/db'

class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>
  declare userId: string
  declare expiresAt: Date

  static associate() {
    RefreshToken.belongsTo(User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    })
  }
}

RefreshToken.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
  }
)

export default RefreshToken
export type RefreshTokenAttributes = Attributes<RefreshToken>
export type RefreshTokenCreationAttributes = CreationAttributes<RefreshToken>
