import Router from 'koa-router';
import * as notificationController from '@functions/controllers/clientApi/notificationController';

const router = new Router({
  prefix: '/clientApi'
});

router.post('/notifications', notificationController.list);

export default router;
