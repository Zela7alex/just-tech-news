// sequelize constructor imported
const Sequelize = require('sequelize')

// .env file hides sql username and password. dotenv does not need to be saved to a variable
require('dotenv').config()

let sequelize
// Jawsdb is Heroku's cloud database, this will now connect app to that database instead of localhost
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  // The base sequelize class is being imported to create a new connection to the database
  // Connection created to DATABASE
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, { // config settings being passed in
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  })
}
module.exports = sequelize
