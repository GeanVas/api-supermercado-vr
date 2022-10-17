const router = require('express').Router();
const product = require('../controllers/product');
const {isAuth, isAdmin} = require('../middlewares/auth');
const sequelize = require('../config/database');
const Product = sequelize.models.Product;

router.get('/', (req, res) => {
    res.send('Hola Mundo');
})

router.get('/productos', async (req, res) => {
    const products = await Product.findAll();
    if (!products) return res.status(404).json({msj: 'No se encuentran productos'});
    res.json(products);
});

router.get('/producto:id', product.getProductById);

router.post('/producto', product.createProduct);

router.post('/checkout', isAuth, );

module.exports = router;