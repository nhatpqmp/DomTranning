import {createSetting, getSetting} from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/install/defaultSetting';
import {getCurrentShopData} from '@functions/helpers/auth';
import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {addNotifications} from '@functions/repositories/notificationRepository';

export async function afterInstall(ctx) {
  try {
    await Promise.all([syncOrders(ctx), addDefaultSetting()]);
  } catch (e) {
    console.error(`Failed to handle after install`, e);
  }
}

export async function syncOrders(ctx) {
  try {
    await installShopHandler(ctx);
    console.log('Successfully sync order');
  } catch (e) {
    console.error(`Failed to sync order:`, e);
  }
}

export async function addDefaultSetting() {
  try {
    const currentSetting = await getSetting();
    if (!currentSetting) {
      const setting = defaultSetting;
      await createSetting(setting);
    }
    console.log('Successfully add default setting');
  } catch (e) {
    console.error(`Failed to add default setting:`, e);
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
    const shopify = initShopify(shopData);
    const shopQuery = loadGraphQL('/order.graphql');
    const orderData = await shopify.graphql(shopQuery, {
      limit: 30
    });

    const notifications = orderData.orders.edges.map(edge => {
      const order = edge.node;
      const address = order.shippingAddress || {};
      const lineItem = order.lineItems?.edges?.[0]?.node || {};
      const product = lineItem.product || {};
      const image = product.images?.edges?.[0]?.node || {};

      const productId = productIdStr ? parseInt(productIdStr, 10) : null;

      return {
        firstName: address.firstName || '',
        city: address.city || '',
        country: address.country || '',
        productName: lineItem.title,
        productId,
        productImage: image.originalSrc,
        timestamp: order.createdAt
      };
    });

    await addNotifications({shopId: shopData.id, notifications});

    ctx.body = {data: notifications, success: true};
  } catch (e) {
    console.error(e);
    ctx.body = {data: [], success: false, error: e.message};
  }
}
