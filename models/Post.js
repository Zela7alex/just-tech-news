const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')

// create Post model
class Post extends Model {
  // This is a "model method". This code used to be in the PUT upvote request in post-routes.js. Sequelize model methods allow developers to give a query a specific name ex).. "upvote()". This will now make the put request for the upvote look cleaner & upvote() can be used as Post.upvote() in post-routes.js as the query >>>
  static upvote (body, models) { // static keyword means that the upvote method is one that's based on the Post model and NOT an "instance method"
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [ // attributes property lets you choose what data you want from the table
          'id',
          'post_url',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      })
    })
  }
}

// fields/columns for Post model created
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isURL: true
      }
    },
    user_id: { // Foreign Key
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post
