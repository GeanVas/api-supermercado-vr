const sequelize = require('../config/database');
const User = sequelize.models.User;

exports.getUsers = async (req, res) => {
    const users = await User.findAll({
        attributes: {exclude: [
            'password',
            'salt', 
            'admin', 
            'card',
            'lastName',
            'id',
            'cellphone',
            'createdAt',
            'updatedAt',
        ]}
    });
    if (!users.length) 
        return res.status(404).json({msj: 'No hay usuarios'});
    res.json(users);
}

exports.getUserById = async (req, res) => {
    const pk = req.params.id;
    const user = await User.findByPk(pk, {
        attributes: 
            {exclude: [
                'password',
                'salt', 
                'admin', 
                'card',
                'lastName',
                'id',
                'cellphone',
                'createdAt',
                'updatedAt',
            ]}
    });
    if (!user)
        return res.status(404).json({msj: 'Usuario no encontrado'});
    res.json(user);
}

exports.getUserByEmail = async (req, res) => {
    const email = req.body.email;
    const user = await User.findOne({
        where: {email: email}
    });
    if (!user) 
        return res.status(404).json({msj: 'Usuario no encontrado'});
    res.json(user);
}