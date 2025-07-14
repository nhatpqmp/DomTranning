import Router from 'koa-router';
import * as sampleController from '@functions/controllers/sampleController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as settingController from '@functions/controllers/settingController';
import * as notificationController from '@functions/controllers/notificationController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/samples', sampleController.exampleAction);
  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);

  router.get('/subscriptions', subscriptionController.getList);
  router.post('/subscriptions', subscriptionController.createOne);
  router.put('/subscriptions', subscriptionController.updateOne);
  router.delete('/subscriptions/:id', subscriptionController.deleteOne);

  router.get('/notifications', notificationController.getList);
  router.post('/notifications/sync', notificationController.installShopHandler);

  router.get('/settings', settingController.getOne);
  router.put('/settings', settingController.updateOne);

  return router;
}
