import knex from 'knex'
import * as dotenv from 'dotenv'
dotenv.config()

export const knexconection = knex({
    client: 'mysql2',
    connection: {
        dateStrings: true,
        host: process.env.HOST_KEY || 'localhost',
        user: process.env.USER_KEY || 'root',
        password: process.env.PASSWORD_KEY || '3636',
        database: process.env.DATABASE_KEY || 'api-curriculo'
    }
})
