const sequelize = require('../config/database');
const Product = sequelize.models.Product;

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    if (!products) return res.status(404).json({msj: 'No se encuentran productos'});
    res.json(products);
}

exports.getProductById = async (req, res) => {
    const pk = req.params.id;
    const product = await Product.findByPk(pk);
    if (!product) return res.status(404).json({msj: 'Producto no encontrado'});
    res.json(product);
}

exports.createProduct = async (req, res) => {
    // TODO
}