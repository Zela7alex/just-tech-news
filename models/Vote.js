const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

class Vote extends Model {}
// This table is considered a "through" table, because it is connecting two other tables *user and * posts

Vote.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: { // Foreign Key
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    post_id: { // Foreign Key
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'vote'
  }
)

module.exports = Vote
