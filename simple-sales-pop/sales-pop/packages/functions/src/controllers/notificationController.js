import {getCurrentShop, getCurrentShopData} from '@functions/helpers/auth';
import {getNotifications} from '@functions/repositories/notificationRepository';
import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {addNotifications} from '@functions/repositories/notificationRepository';

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

/**
 *
 * @param ctx
 * @returns {Promise<void>}
 */
export async function installShopHandler(ctx) {
  try {
    const shopData = getCurrentShopData(ctx);

    const shopify = await initShopify(shopData);
    const shopQuery = loadGraphQL('/order.graphql');
    const orderData = await shopify.graphql(shopQuery);

    const notifications = [];

    for (const edge of orderData.orders.edges) {
      const order = edge.node;
      const address = order.shippingAddress || {};
      const lineItemEdge = order.lineItems?.edges?.[0];
      const lineItem = lineItemEdge?.node || {};
      const product = lineItem.product || {};
      const imageEdge = product.images?.edges?.[0];
      const image = imageEdge?.node || {};

      const productIdStr = product.id?.split('/').pop();
      const productId = productIdStr ? parseInt(productIdStr, 10) : null;

      if (productId && lineItem.title && image.originalSrc) {
        notifications.push({
          firstName: address.firstName || '',
          city: address.city || '',
          country: address.country || '',
          productName: lineItem.title,
          productId,
          productImage: image.originalSrc,
          timestamp: order.createdAt
        });
      }
    }
    await addNotifications(shopData.id, notifications);
    ctx.body = {data: notifications, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], success: false};
  }
}
