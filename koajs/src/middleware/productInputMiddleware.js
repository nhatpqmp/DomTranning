const yup = require('yup');

async function productInputMiddleware(ctx, next) {
    try {
        const postData = ctx.request.body;

        const schema = yup.object().shape({
            id: yup.number().positive().integer().required(),
            name: yup.string().required(),
            price: yup.number().positive().required(),
            description: yup.string().required(),
            product: yup.string().required(),
            color: yup.string().required(),
            createdAt: yup.date().required(),
            image: yup.string().url().required()
        });

        await schema.validate(postData, { abortEarly: false });
        await next();
    } catch (e) {
        ctx.status = 400;
        ctx.body = {
            success: false,
            errors: e.errors,
            errorName: e.name
        };
    }
}

module.exports = productInputMiddleware;
