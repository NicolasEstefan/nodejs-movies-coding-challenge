import { Sequelize, Transaction } from 'sequelize'

const db = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USERNAME!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    define: {
      underscored: true
    },
    port: Number(process.env.DB_PORT),
    logging: false
  }
)

export default db


