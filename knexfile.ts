const dotenv = require('dotenv')
dotenv.config()

const { CLIENT, DATABASE_KEY, USER_KEY, PASSWORD_KEY, HOST_KEY, PORT_BD } = process.env
const diretorio = __dirname

module.exports = {
  development: {
    client: CLIENT,
    connection: {
      database: DATABASE_KEY,
      user: USER_KEY,
      password: PASSWORD_KEY,
      host: HOST_KEY,
      port: PORT_BD
    },
    migrations: {
      directory: `${diretorio}/src/database/migrations`
    }
  }
}
