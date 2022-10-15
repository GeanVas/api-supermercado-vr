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

module.exports = {
    isAdmin,
    isAuth
};