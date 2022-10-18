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
    if (!users) 
        return res.status(404).json({msj: 'No hay usuarios'});
    res.json(users);
}