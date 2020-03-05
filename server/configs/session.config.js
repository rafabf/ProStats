const passport = require('passport')
const session = require('express-session')
require('./passport.config')
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose')
module.exports = app => {
    // Configuración de sesión
    app.use(session({
        secret: 'Whatever',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 2 * 60 * 60 * 1000 },
        store: new MongoStore({ mongooseConnection: mongoose.connection })

    }))
    app.use(passport.initialize())
    app.use(passport.session())
}