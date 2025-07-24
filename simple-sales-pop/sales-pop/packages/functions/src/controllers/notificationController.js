import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import {
  getNotificationByDomain,
  getNotifications
} from '@functions/repositories/notificationRepository';
import {initShopify} from '@functions/services/shopifyService';
import {registerWebhook} from '@functions/services/webhookService';
import {
  afterInstall as affterInstallService,
  registerScriptTag
} from '@functions/services/affterInstallService';
import {list} from '@functions/controllers/clientApi/notificationController';
import {getSetting} from '@functions/repositories/settingRepository';

/**
 * @param {Context|Object|*} ctx
 * @returns {Promise<{data: *[], total?: number, pageInfo?: {hasNext: boolean, hasPre: boolean, totalPage?: number}}>}
 */
export async function getList(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const query = ctx.query;
    const notifications = await getNotifications({shopId, query});
    return (ctx.body = {
      data: notifications.data,
      pageInfo: notifications.pageInfo,
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
    console.log('Domain:', shopData.shopifyDomain);
    console.log('shopify:', shopify.options.accessToken);
    //
    // const data = await registerWebhook({
    //   shopifyDomain: shopData.shopifyDomain,
    //   accessToken: shopify.options.accessToken
    // });
    // return (ctx.body = {
    //   data: data,
    //   success: true
    // });
    // await affterInstallService(ctx);

    await registerScriptTag({
      shopifyDomain: shopData.shopifyDomain,
      accessToken: shopify.options.accessToken
    });

    /*const [notifications, setting] = await Promise.all([
      getNotificationByDomain(shopData.id),
      getSetting(shopData.id)
    ]);*/

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    return (ctx.body = {data: [], error: e.message});
  }
}
