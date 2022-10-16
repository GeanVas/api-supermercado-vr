const sequelize = require('../config/database');
const Product = sequelize.models.Product;

const getProducts = async (req, res) => {
    const products = await Product.findAll();
    req.json(products);
}

const getProductById = async (req, res) => {
    const pk = req.params.id;
    const product = await Product.findByPk(pk);
    req.json(product);
}

module.exports = {
    getProducts,
    getProductById
};