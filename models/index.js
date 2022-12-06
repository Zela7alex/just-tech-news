// Importing the User model
const User = require('./User')
const Post = require('./Post')

// creating association of user to many posts that can be posted by them via sequelize method
User.hasMany(Post, {
  foreignKey: 'user_id'
})
// Making reverse association for posts to user
Post.belongsTo(User, {
  foreignKey: 'user_id'
})

module.exports = { User, Post }
