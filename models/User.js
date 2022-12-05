const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// User Model class created
class User extends Model {}

// table columns and configuration defined
User.init(
  { // TABLE COLUMN DEFINITIONS GO HERE
    // id column:
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true
    },
    // username column:
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // email column:
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true
      }
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4]
      }
    }
  },
  { // sequelize connection passed in (the direct connection to the database)
    sequelize,
    // don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // don't pluralize name of database table
    freezeTableName: true,
    // use underscores instead of camel-casing(i.e. `comment_text` and not `commentText`)
    underscored: true,
    // make it so model name stays lowercase in the database
    modelName: 'user'
  }
)

module.exports = User
