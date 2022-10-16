const router    = require('express').Router();
const passport  = require('passport');
const sequelize = require('../config/database');
const User      = sequelize.models.User;
const { genPassword }     = require('../lib/passwordUtils');

router.post('/login', passport.authenticate('local'), (req, res) => {
    if (!req.user) return res.sendStatus(401);
    res.sendStatus(200);
});

router.post('/register', async (req, res) => {
    const saltHash = genPassword(req.body.password);

    const salt = saltHash.salt;
    const password = saltHash.hash;

    await User.create({
        email: req.body.email,
        password: password,
        salt: salt
    });
    res.sendStatus(201);
});

router.get('/logout', (req, res, next) => {
    req.logout();
})

module.exports = router;