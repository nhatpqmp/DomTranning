const Router = require('koa-router');
const productHandler = require('../handlers/products/productHandlers');
const productInputMiddleware = require('../middleware/productInputMiddleware');
const productUpdateMiddleware = require('../middleware/productUpdateMiddleware');

const router = new Router({
    prefix: '/api/products'
});

router.get('/', productHandler.getProducts);
router.get('/:id', productHandler.getProduct);
router.post('/', productInputMiddleware, productHandler.createProduct);
router.put('/:id', productUpdateMiddleware, productHandler.updateProduct);
router.delete('/:id', productHandler.deleteProduct);


module.exports = router;
