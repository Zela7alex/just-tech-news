// Importing the User model
const User = require('./User')
const Post = require('./Post')

// creating association of user to many posts that can be posted by them via sequelize method
User.hasMany(Post, { // User can have many posts associated to fk user_id in posts
  foreignKey: 'user_id'
})
// Making reverse association for posts to user
Post.belongsTo(User, { // Post belongs to user with associated fk
  foreignKey: 'user_id'
})

module.exports = { User, Post }
