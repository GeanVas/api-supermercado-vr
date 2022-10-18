const express   = require("express");
const session   = require('express-session');
const logger    = require('morgan');
const passport  = require("passport");
const sequelize = require('./config/database');

const SequelizeStore = require('connect-session-sequelize')(session.Store);

require('dotenv').config();

const app  = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

const sessionStore = new SequelizeStore({
    db: sequelize
});

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    console.log(req.session);
    console.log(req.account);
    next();
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api', require('./routes/index'));

app.listen(port, () => console.log("Server on port:", port));
