const Router = require('koa-router');
const todoHandler = require('../handlers/todosHandlers');
const todoInputMiddleware = require('../middleware/todoInputMiddleware');
const todoUpdateMiddleware = require('../middleware/todoUpdateMiddleware');

const router = new Router();

router.get('/api/todos', todoHandler.getAll);
router.get('/api/todos/:id', todoHandler.getTodo);
router.post('/api/todos', todoInputMiddleware, todoHandler.createTodo);
router.put('/api/todos/:id', todoUpdateMiddleware, todoHandler.updateTodo);
router.delete('/api/todos/:id', todoHandler.deleteTodo);

module.exports = router;
