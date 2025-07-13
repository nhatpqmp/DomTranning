const {
    getAll: getTodos,
    getOne,
    add,
    update,
    remove
} = require('../database/todoRepository');

async function getAll(ctx) {
    try {
        const todos = await getTodos();
        ctx.body = { data: todos };
    } catch (e) {
        ctx.status = 400;
        ctx.body = { error: e.message };
    }
}

async function getTodo(ctx) {
    try {
        const todo = await getOne(ctx.params.id);
        ctx.body = { data: todo };
    } catch (e) {
        ctx.status = 404;
        ctx.body = { error: e.message };
    }
}

async function createTodo(ctx) {
    try {
        const data = ctx.req.body;

        await add(data);
        ctx.status = 201;
        ctx.body = { success: true };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { success: false, message: e.message };
    }
}

async function updateTodo(ctx) {
    try {
        await update(ctx.params.id, ctx.req.body);
        ctx.body = { success: true };
    } catch (e) {
        ctx.status = 400;
        ctx.body = { error: e.message };
    }
}

async function deleteTodo(ctx) {
    try {
        await remove(ctx.params.id);
        ctx.body = { success: true };
    } catch (e) {
        ctx.status = 500;
        ctx.body = { error: e.message };
    }
}

module.exports = {
    getAll,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};
