const {Sequelize} = require('sequelize');
require('dotenv').config();

const db_name = process.env.DB_NAME;
const db_uname = process.env.DB_UNAME;
const db_pw = process.env.DB_PW;

const sequelize = new Sequelize(db_name, db_uname, db_pw, {
    host: 'localhost',
    dialect: 'mysql',
});

// const Account = require('../models/account')(sequelize);
const User = require('../models/user')(sequelize);
const Product = require('../models/product')(sequelize);

sequelize.sync().then(() => console.log('DB sync'));

module.exports = sequelize;