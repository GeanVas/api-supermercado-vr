const router  = require('express').Router();
const product = require('../controllers/product');
const user    = require('../controllers/user');
const {isAuth, isAdmin} = require('../middlewares/auth');

router.get('/', (req, res) => {
    res.send('Hola Mundo');
})

router.get('/productos', product.getProducts);

router.get('/producto:id', product.getProductById);

router.post('/producto', product.createProduct);

router.post('/checkout', isAuth, );

router.get('/usuarios', user.getUsers)

module.exports = router;