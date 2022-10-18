const router    = require('express').Router();
const passport  = require('passport');
const sequelize = require('../config/database');
const User      = sequelize.models.User;
const { isAuth } = require('../middlewares/auth');
const { genPassword } = require('../lib/passwordUtils');
const { signupValidation, signupSchema } = require('../middlewares/auth');

router.post('/login', passport.authenticate('local'), (req, res) => {
    if (!req.user) 
        return res.status(401).json({msj: 'error'}); 
    res.status(200).json({msj: 'ok'});
});

router.post('/register', 
    signupSchema,
    signupValidation,
    async (req, res) => {
        const saltHash = genPassword(req.body.password);

        const salt = saltHash.salt;
        const password = saltHash.hash;

        const user = await User.findOne({
            where: {email: req.body.email}
        });

        if (!user) {
            User.create({
                email: req.body.email,
                password: password,
                salt: salt
            })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(500).json({msj: err}));
        } else 
            res.status(400).json({msj: 'Correo ya esta en uso'});
    }
);
// TODO revisar porque siempre tira 200
router.post('/logout', isAuth, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            res.json({msj: err})
            return next(err);
        }
        res.status(200).json({ok: 200});
    });
})

module.exports = router;