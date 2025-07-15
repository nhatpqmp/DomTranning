import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import {getNotifications} from '@functions/repositories/notificationRepository';
import {initShopify} from '@functions/services/shopifyService';
import {registerWebhook} from '@functions/services/webhookService';

/**
 * @param {Context|Object|*} ctx
 * @returns {Promise<{data: *[], total?: number, pageInfo?: {hasNext: boolean, hasPre: boolean, totalPage?: number}}>}
 */
export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const query = ctx.query;
    const notifications = await getNotifications(shopId, query);
    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (e) {
    return (ctx.body = {data: [], error: e.message});
  }
}

export async function afterInstall(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);
    const shopify = await initShopify(shopData);

    const data = await registerWebhook(shopData.shopifyDomain, shopify.options.accessToken);
    return (ctx.body = {
      data: data,
      success: true
    });
    // await afterInstall(ctx);
  } catch (e) {
    return (ctx.body = {data: [], error: e.message});
  }
}
