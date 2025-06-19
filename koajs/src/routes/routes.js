const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandlers');
const productInputMiddleware = require('../middleware/productInputMiddleware');
const productUpdateMiddleware = require('../middleware/productUpdateMiddleware');
const {getAll: getAllProducts} = require("../database/productRepository");

const router = new Router();

router.get('/products', async (ctx) => {
    const products = getAllProducts();
    await ctx.render('product', {
        products
    });
});

router.get('/api/products/', productHandler.getProducts);
router.get('/api/products/:id', productHandler.getProduct);
router.post('/api/products/', productInputMiddleware, productHandler.createProduct);
router.put('/api/product/:id', productUpdateMiddleware, productHandler.updateProduct);
router.delete('/api/product/:id', productHandler.deleteProduct);


module.exports = router;
