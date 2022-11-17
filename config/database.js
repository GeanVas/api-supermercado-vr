const {Sequelize} = require('sequelize');
require('dotenv').config();

const db_name = process.env.DB_NAME;
const db_uname = process.env.DB_UNAME;
const db_pw = process.env.DB_PW;

const sequelize = new Sequelize(db_name, db_uname, db_pw, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

const User          = require('../models/user')(sequelize);
const Product       = require('../models/product')(sequelize);
const OrderDetail   = require('../models/orderDetail')(sequelize);
const Order         = require('../models/order')(sequelize);

// User 1:M Order
User.hasMany(Order);
Order.belongsTo(User);

// Product M:N Order
Order.belongsToMany(Product, {through: OrderDetail});
Product.belongsToMany(Order, {through: OrderDetail});

sequelize.sync().then(() => console.log('DB sync'));

module.exports = sequelize;