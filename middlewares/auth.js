const { check, validationResult }  = require('express-validator');
const msg = { msg: 'You are not authenticated' }

const isAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).json(msg);
    }
}

const isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.admin) {
        next();
    } else {
        res.status(401).json(msg);
    }
}

const signupSchema = [
    check('email', 'El email es obligatorio')
        .not().isEmpty()
        .isEmail().withMessage('Debe ser un email valido'),
    check('password', 'La contraseña es obligatoria')
        .not().isEmpty()
        .isLength({min: 6}),
]

const signupValidation = (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty())
        return res.status(400).json({err: err.array()})
    next();
}

module.exports = {
    isAdmin,
    isAuth,
    signupSchema,
    signupValidation
};