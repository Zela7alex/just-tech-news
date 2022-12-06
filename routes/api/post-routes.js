const router = require('express').Router()
const { Post, User } = require('../../models')

// GET all posts by users
router.get('/', (req, res) => {
  Post.findAll({
    attributes: ['id', 'post_url', 'title', 'created_at'], // all the columns that will be used from table aka "Post.js Model" to create a post
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
    attributes: ['id', 'post_url', 'title', 'created_at'],
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
