import {getCurrentShop} from '@functions/helpers/auth';
import {getNotifications} from '@functions/repositories/notificationRepository';

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
