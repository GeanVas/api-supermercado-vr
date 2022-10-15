const { DataTypes } = require('sequelize');

const Account = (sequelize) => {
    sequelize.define({
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
            type: DataTypes.BOOLEAN
        }
    });
}

module.exports = Account;