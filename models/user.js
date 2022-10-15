const { DataTypes } = require('sequelize');

const User = (sequelize) =>  {
    sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        salt: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.BOOLEAN,
            default: false
        },
        name: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        cellphone: {
            type: DataTypes.STRING,
        },
        card: {
            type: DataTypes.INTEGER
        }
    });
}

module.exports = User;