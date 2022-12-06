const express = require('express')
const routes = require('./routes')
const sequelize = require('./config/connection')

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// turn on routes
app.use(routes)

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'))
}) // sequelize.sync means that this is sequelize taking the models and connecting them to associated database tables. If not, it will just create one.
// if there are model changes, the tables must be dropped using {{ force: true }}
