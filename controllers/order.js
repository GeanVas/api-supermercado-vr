const sequelize = require('../config/database');
const Order     = sequelize.models.Order;
const Product   = sequelize.models.Product;
const User      = sequelize.models.User;

exports.createOrder = async (req, res) => {
    const {products, sAddress, userId} = req.body;

    if (products.length <= 0)
        return res.status(400).json({msj: 'Se requieren productos'});
    
    const user = await User.findByPk(userId);
    if (!user)
        return res.status(404).json({msj: 'Usuario no encontrado'});
    
    const order = await Order.create({
        shippingAddress: sAddress,
        email: user.email,
        orderDate: Date.now(),
        status: 'Procesando'
    });

    for (const product of products) {
        const {id, quantity} = product;
        
        const prod = await Product.findByPk(id);
        
        if (!prod) return;
        
        let price = prod.price;

        if (prod.discount != 0) 
            price = prod.price + ((prod.price * prod.discount) / 100);

        order.addProduct(prod, {through: {
            price: price * quantity,
            quantity: quantity
        }})
    }

    res.status(201).json(order.getProducts());
}