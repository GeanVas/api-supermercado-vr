const sequelize = require('../config/database');
const Product = sequelize.models.Product;

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    if (!products.length) 
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

exports.getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    const products = await Product.findAll({
        where: {category: category}
    });
    if (!products.length)
        return res.status(404).json({msj: 'No hay productos de esa categoria'});
    res.status(200).json(products);
}

exports.createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    if(!product) 
        return res.status(400).json({msj: 'No se pudo crear el producto'});
    res.status(201).json(product);
}