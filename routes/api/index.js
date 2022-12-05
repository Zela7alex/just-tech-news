// setting up this file with the route in this way means that multiple routes files will not need to be imported to the server

const router = require('express').Router()

const userRoutes = require('./user-routes.js')

router.use('/users', userRoutes)

module.exports = router
