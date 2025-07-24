import {getShopByShopifyDomain} from '@avada/core';
import {getNotificationByDomain} from '@functions/repositories/notificationRepository';
import {getSettings} from '@functions/repositories/settingRepository';

export async function list(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const shopData = await getShopByShopifyDomain(shopifyDomain);

    const [notifications, settings] = await Promise.all([
      getNotificationByDomain(shopData.id),
      getSettings(shopData.id)
    ]);

    return (ctx.body = {
      notifications,
      settings
    });
  } catch (e) {
    return (ctx.body = {data: [], error: e.message});
  }
}
