const yup = require('yup');

async function productUpdateMiddleware(ctx, next) {
    try {
        const updateData = ctx.request.body;

        const schema = yup.object().shape({
            name: yup.string().optional(),
            price: yup.number().positive().optional(),
            description: yup.string().optional(),
            product: yup.string().optional(),
            color: yup.string().optional(),
            createdAt: yup.date().optional(),
            image: yup.string().url().optional()
        });

        await schema.validate(updateData, { abortEarly: false });

        await next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            message: 'Invalid input format',
            errors: e.errors
        };
    }
}

module.exports = productUpdateMiddleware;
