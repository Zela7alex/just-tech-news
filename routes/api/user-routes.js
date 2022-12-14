const router = require('express').Router()
const { User, Post, Vote, Comment } = require('../../models')

// GET /api/users
router.get('/', (req, res) => {
  // Access User model and run .findAll() method)
  User.findAll({ // User.findAll is a sequelize method
    attributes: { exclude: ['password'] } // this will make sure users can't request passwords
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Post,
        attributes: ['id', 'title', 'post_url', 'created_at']
      },
      { // This will join the comment model with the attributes desired
        model: Comment,
        attributes: ['id', 'comment_text', 'created_at'],
        include: { // must include user model in comment so that the username can be attached
          model: Post,
          attributes: ['title']
        }
      },
      { // votes with post will now show under user data
        model: Post,
        attributes: ['title'],
        through: Vote,
        as: 'voted_posts'
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// POST /api/users
router.post('/', (req, res) => {
  // expects {username: 'Alex', email: 'alex123@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})
// Post to verify login by user
router.post('/login', (req, res) => {
  // expects {email: 'lalex123@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' })
      return
    }

    // Verifying user password
    const validPassword = dbUserData.checkPassword(req.body.password)
    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' })
      return
    }

    res.json({ user: dbUserData, message: 'You are now logged in!' })
  })
})

// PUT /api/users/1
router.put('/:id', (req, res) => {
  // expects {username: 'Alexandra', email: 'alex123@gmail.com', password: 'password1234'}

  // if req.body has exact key/value pairs to match the model, you can just use `req.body` instead
  User.update(req.body, {
    individualHooks: true, // this must be added in order to use beforeUpdate() in models/User.js for password hashing
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' })
        return
      }
      res.json(dbUserData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

module.exports = router
