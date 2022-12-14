// setting up this file with the route in this way means that multiple routes files will not need to be imported to the server

const router = require('express').Router()

const userRoutes = require('./user-routes.js')
const postRoutes = require('./post-routes.js')
const commentRoutes = require('./comment-routes')

router.use('/users', userRoutes)
router.use('/posts', postRoutes)
router.use('/comments', commentRoutes)

module.exports = router
