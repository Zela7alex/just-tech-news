const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

// User Model class created
class User extends Model {
  // set up method to run on instance data (per user) to check password "instance method"
  checkPassword (loginPw) {
    return bcrypt.compareSync(loginPw, this.password)
  }
}

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
  {
    hooks: {
      //  beforeCreate lifecycle "hook" functionality set up
      async beforeCreate (newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10) // 10 equals 10 saltrounds of hashing done
        return newUserData // await will return the promise
      },
      // beforeUpdate lifecycle "hook" functionality set up
      // This will now hash passwords of user being updated through sequelize
      async beforeUpdate (updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
        return updatedUserData // await will return the promise
      }
    },
    // sequelize connection passed in (the direct connection to the database)
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
