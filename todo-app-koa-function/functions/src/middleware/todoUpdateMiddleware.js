const yup = require('yup');

async function todoUpdateMiddleware(ctx, next) {
    try {
        const updateData = ctx.request.body;

        const schema = yup.object().shape({
            title: yup.string(),
            completed: yup.boolean(),
            userId: yup.number()
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

module.exports = todoUpdateMiddleware;
