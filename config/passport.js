const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sequelize     = require('./database');
const User          = sequelize.models.User;
const { validPassword } = require('../lib/passwordUtils');

const customFields = {
    usernameField: 'email',
    passwordField: 'password'
};

const verifyCallBack = async (username, password, done) => {
    
    User.findOne({where: {email: username}})
        .then((acc) => {
            if (!acc) { return done(null, false) }

            const isValid = validPassword(password, acc.password, acc.salt);

            if (isValid) {
                return done(null, acc);
            } else {
                return done(null, false);
            }
        })
        .catch((err) => {
            done(err);
        });
}

const strategy = new LocalStrategy(customFields, verifyCallBack);

passport.use(strategy);

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((userId, done) => {
    User.findByPk(userId)
        .then((user) => {
            done(null, user);
        })
        .catch((err) => {
            done(err);
        });
});