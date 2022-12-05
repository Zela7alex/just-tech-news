// setting up this file with the route in this way means that multiple routes files will not need to be imported to the server

const router = require('express').Router()

const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
  res.status(404).end()
})

module.exports = router
