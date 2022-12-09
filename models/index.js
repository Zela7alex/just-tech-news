// Importing the User model
const Post = require('./Post')
const User = require('./User')
const Vote = require('./Vote')
const Comment = require('./Comment')

// creating association of user to many posts that can be posted by them via sequelize method
User.hasMany(Post, { // User can have many posts associated to fk user_id in posts
  foreignKey: 'user_id'
})
// Making reverse association for posts to user
Post.belongsTo(User, { // Post belongs to user with associated fk
  foreignKey: 'user_id'
})
// ^--- Vote ---
User.belongsToMany(Post, {
  through: Vote, // connecting post and user models through vote model with associated fk
  as: 'voted_posts',
  foreignKey: 'user_id'
})

Post.belongsToMany(User, {
  through: Vote, // connecting post and user models through vote model with associated fk
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

// ^--- Comment ---
Comment.belongsTo(User, {
  foreignKey: 'user_id'
  // connecting comment and user models with associated fk
})

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
})

User.hasMany(Comment, {
  foreignKey: 'user_id'
})

Post.hasMany(Comment, {
  foreignKey: 'post_id'
})

module.exports = { User, Post, Vote, Comment }
