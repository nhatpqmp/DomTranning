import Router from 'koa-router';

const router = new Router({
  prefix: '/webhook'
});

router.post('/order/new', webhookController.listenNewOrder);

export default router;
