const router = require('express').Router()
const sequelize = require('../../config/connection')
const { Post, User, Vote } = require('../../models')

// GET all posts by users
router.get('/', (req, res) => {
  console.log('======================')
  Post.findAll({ // attributes property lets you choose what data you want from the table
    attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ], // all the columns that will be used from table aka "Post.js Model" to create a post
    order: [['created_at', 'DESC']], // shows the most recent posts
    include: [ // This will JOIN to the USER table "model" by using include:
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// GET a single post
router.get('/:id', (req, res) => {
  Post.findOne({ // finding a single post
    where: {
      id: req.params.id
    },
    attributes: ['id', 'post_url', 'title', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ], // Counting total number of votes (.literal a special method by sequelize, used in case sequelize does not have a method we need like counting all votes of an associated table )
    include: [ // This will JOIN to the User table "model" by using include:
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' })
        return
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// POST a single post
router.post('/', (req, res) => {
  // expects example : {title: 'Tasks On!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// PUT /api/posts/upvote
// upvote put request must be first in order for express to not see it as a valid parameter for  put(/:id)
router.put('/upvote', (req, res) => {
  // custom static method created in models/Post.js
  Post.upvote(req.body, { Vote })
    .then(updatedPostData => res.json(updatedPostData))
    .catch(err => {
      console.log(err)
      res.status(400).json(err)
    })
})

// UPDATE a posts title
router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title // updating the post title
    },
    {
      where: { // finding where the post is
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' })
        return
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// DELETE a post
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' })
        return
      }
      res.json(dbPostData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
