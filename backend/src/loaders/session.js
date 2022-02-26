const session = require('express-session')
const DB_key = require('$/config').DB_key
const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore(DB_key)
const passport = require('passport')
const LocalStrategy = require ('passport-local').Strategy
const flash = require('connect-flash')
const session_secret = require(__dirname+'/../config').session_secret;
module.exports = ({app}) => {
    
    app.use(session({
        secret: session_secret,
        resave: false,
        saveUninitialized: true,
        store: sessionStore
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    return app;
}