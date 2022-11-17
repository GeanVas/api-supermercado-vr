const router  = require('express').Router();
const product = require('../controllers/product');
const user    = require('../controllers/user');
const order   = require('../controllers/order');
const {isAuth, isAdmin} = require('../middlewares/auth');
const uploadFile = require('../lib/uploadFile');

router.get('/', (req, res) => {
    res.send('Hola Mundo');
})

router.get('/productos', isAuth, product.getProducts);
router.get('/producto/:id', product.getProductById);
router.get('/productos/:categoria', product.getProductsByCategory);
router.post('/producto', uploadFile.single('image'), product.addProduct);

router.get('/usuarios', user.getUsers)
router.get('/usuario/:id', user.getUserById);

router.post('/checkout', isAuth, uploadFile.none(), order.createOrder);

module.exports = router;