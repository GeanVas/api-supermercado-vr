const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return orderDetail = sequelize.define('OrderDetail', {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
}