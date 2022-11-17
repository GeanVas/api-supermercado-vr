const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return order = sequelize.define('Order', {
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        orderDate: {
            type: DataTypes.DATE,
        },
        status: {
            type: DataTypes.STRING
        }
    });
}