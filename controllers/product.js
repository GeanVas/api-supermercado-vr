const sequelize = require('../config/database');
const Product   = sequelize.models.Product;
const base64Encode = require('../lib/base64');
const path = require('path');

exports.getProducts = async (req, res) => {
    const products = await Product.findAll();
    if (!products.length) 
        return res.status(404).json({msj: 'No se encuentran productos'});
    
    products.forEach(product => {
        product.image = base64Encode(
            path.join(__dirname, '../assets/uploads', product.image));
    });
    
    res.status(200).json(products);
}

exports.getProductById = async (req, res) => {
    const pk = req.params.id;
    let product = await Product.findByPk(pk);
    if (!product) 
        return res.status(404).json({msj: 'Producto no encontrado'});
    
    product.image = base64Encode(
        path.join(__dirname, '../assets/uploads', product.image));
    
    res.status(200).json(product);
}

exports.getProductsByCategory = async (req, res) => {
    const category = req.params.category;
    const products = await Product.findAll({
        where: {category: category}
    });
    if (!products.length)
        return res.status(404).json({msj: 'No hay productos de esa categoria'});
    
    products.forEach(product => {
        product.image = base64Encode(
            path.join(__dirname, '../assets/uploads', product.image));
    });
    
    res.status(200).json(products);
}

exports.addProduct = async (req, res) => {
    let { name, category, stock, price, description } = req.body;
    const image = req.file.filename;

    stock = parseInt(stock);
    price = parseFloat(price)

    const product = await Product.create({
        name: name,
        category: category,
        stock: stock,
        price: price,
        description: description,
        image: image
    });

    if (!product) 
        return res.status(400).json({msj: 'No se pudo crear el producto'});
    res.status(201).json(product);
}