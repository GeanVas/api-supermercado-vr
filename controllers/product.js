const sequelize = require('../config/database');
const Product = sequelize.models.Product;

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    if (!products) 
        return res.status(404).json({msj: 'No se encuentran productos'});
    res.status(200).json(products);
}

exports.getProductById = async (req, res) => {
    const pk = req.params.id;
    const product = await Product.findByPk(pk);
    if (!product) 
        return res.status(404).json({msj: 'Producto no encontrado'});
    res.status(200).json(product);
}

exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    if(!product) 
        return res.status(400).json({msj: 'No se pudo crear el producto'});
    res.status(201).json(product);
}