const {
    getAll: getAllProducts,
    getOne: getOneProduct,
    add: addProduct,
    update: updateProduct,
    remove: removeProduct
} = require("../../database/productRepository");

async function getProducts(ctx) {
    try {
        let products = getAllProducts();

        const { limit, sort } = ctx.query;

        if (sort === 'asc' || sort === 'desc') {
            products.sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);

                return sort === 'asc' ? dateA - dateB : dateB - dateA;
            });
        }

        if (limit) {
            products = products.slice(0, parseInt(limit));
        }

        ctx.body = { data: products };
    } catch (e) {
        ctx.status = 500;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}


/**
 * GET /api/products/:id?fields=name,price
 */
async function getProduct(ctx) {
    try {
        const { id } = ctx.params;
        const { fields } = ctx.query;

        const product = getOneProduct(id);
        if (!product) throw new Error('Product not found');

        let result = product;

        if (fields) {
            const fieldList = fields.split(',');
            result = Object.fromEntries(
                Object.entries(product).filter(([key]) => fieldList.includes(key))
            );
        }

        ctx.body = { data: result };
    } catch (e) {
        ctx.status = 404;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * POST /api/products
 */
async function createProduct(ctx) {
    try {
        const postData = ctx.request.body;
        addProduct(postData);
        ctx.status = 201;
        ctx.body = { success: true };
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * PUT /api/products/:id
 */
async function updateProductHandler(ctx) {
    try {
        const { id } = ctx.params;
        const data = ctx.request.body;
        updateProduct(id, data);
        ctx.body = { success: true };
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * DELETE /api/products/:id
 */
async function deleteProduct(ctx) {
    try {
        const { id } = ctx.params;
        removeProduct(id);
        ctx.body = { success: true };
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            error: e.message
        };
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct: updateProductHandler,
    deleteProduct
};
