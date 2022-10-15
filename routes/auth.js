const router    = require('express').Router();
const passport  = require('passport');
const sequelize = require('../config/database');
const User      = sequelize.models.User;
const { genPassword }     = require('../lib/passwordUtils');
const { isAdmin, isAuth } = require('../middlewares/auth');

router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post('/register', async (req, res, next) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const password = saltHash.hash;

    await User.create({
        email: req.body.email,
        password: password,
        salt: salt
    });
    // res.redirect('/login');
    res.status(201).send({msg: 'Usuario creado'});
});

router.get('/logout', (req, res, next) => {
    req.logout();
})

module.exports = router;