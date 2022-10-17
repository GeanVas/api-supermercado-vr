const router = require('express').Router();
const product = require('../controllers/product');
const {isAuth, isAdmin} = require('../middlewares/auth');

router.get('/productos', product.getProducts);

router.get('/producto:id', product.getProductById);

router.post('/producto', product.createProduct);

router.post('/checkout', isAuth, );

module.exports = router;