const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return product = sequelize.define('Product', {
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        expDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        elabDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        discount: {
            type: DataTypes.FLOAT
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
}