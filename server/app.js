// Enviroment variables
require('dotenv').config()

// Database connection
require('./configs/mongoose.config')

// Application instance
const express = require('express')
const app = express()

// Configs
require('./configs/middleware.config')(app)
require('./configs/locals.config')(app)
require('./configs/session.config')(app)


// Base URLS
app.use('/auth', require('./routes/auth.routes'))
app.use('/teams', require('./routes/team.routes'))
app.use('/files', require('./routes/files.routes'))

module.exports = app