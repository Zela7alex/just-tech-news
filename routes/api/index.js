// setting up this file with the route in this way means that multiple routes files will not need to be imported to the server

const router = require('express').Router()

const userRoutes = require('./user-routes.js')
const postRoutes = require('./post-routes.js')

router.use('/users', userRoutes)
router.use('/posts', postRoutes)

module.exports = router
