const yup = require('yup');

async function todoInputMiddleware(ctx, next) {
    try {
        const postData = ctx.req.body;

        const schema = yup.object().shape({
            title: yup.string().required(),
            completed: yup.boolean().required()
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

module.exports = todoInputMiddleware;
