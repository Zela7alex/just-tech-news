// Importing the User model
const User = require('./User')
const Post = require('./Post')
const Vote = require('./Vote')

// creating association of user to many posts that can be posted by them via sequelize method
User.hasMany(Post, { // User can have many posts associated to fk user_id in posts
  foreignKey: 'user_id'
})
// Making reverse association for posts to user
Post.belongsTo(User, { // Post belongs to user with associated fk
  foreignKey: 'user_id'
})

User.belongsToMany(Post, {
  through: Vote, // connecting post and user models through vote model
  as: 'voted_posts',
  foreignKey: 'user_id'
})

Post.belongsToMany(User, {
  through: Vote, // connecting post and user models through vote model
  as: 'voted_posts',
  foreignKey: 'post_id'
})

Vote.belongsTo(User, {
  foreignKey: 'user_id'
})

Vote.belongsTo(Post, {
  foreignKey: 'post_id'
})

User.hasMany(Vote, {
  foreignKey: 'user_id'
})

Post.hasMany(Vote, {
  foreignKey: 'post_id'
})

module.exports = { User, Post, Vote }
