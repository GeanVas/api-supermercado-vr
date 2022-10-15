const { DataTypes } = require('sequelize');

const Product = (sequelize) => {
    sequelize.define({
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

module.exports = Product;