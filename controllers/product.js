const sequelize = require('../config/database');
const Product = sequelize.models.Product;

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    req.json(products);
}

exports.getProductById = async (req, res) => {
    const pk = req.params.id;
    const product = await Product.findByPk(pk);
    req.json(product);
}

exports.createProduct = async (req, res) => {
    // TODO
}