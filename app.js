const express = require("express");
const session = require('express-session');
const logger = require('morgan');
const passport = require("passport");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

require('./config/passport')(passport);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(logger('dev'));

app.use(session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// app.use('./routes/login');

app.listen(port, () => console.log("Server on port:", port));
