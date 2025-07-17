import {getShopByShopifyDomain} from '@avada/core';
import {getNotificationByDomain} from '@functions/repositories/notificationRepository';
import {getSetting} from '@functions/repositories/settingRepository';

export async function list(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shopData = await getShopByShopifyDomain(shopifyDomain);

    const [notifications, setting] = await Promise.all([
      getNotificationByDomain(shopData.id),
      getSetting(shopData.id)
    ]);

    console.log(notifications);

    return (ctx.body = {
      notifications,
      setting
    });
  } catch (e) {
    return (ctx.body = {data: [], error: e.message});
  }
}
