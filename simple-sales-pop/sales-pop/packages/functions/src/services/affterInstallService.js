import {createSetting, getSettings} from '@functions/repositories/settingRepository';
import defaultSetting from '@functions/install/defaultSetting';
import {initShopify} from '@functions/services/shopifyService';
import {loadGraphQL} from '@functions/helpers/graphql/graphqlHelpers';
import {addNotifications} from '@functions/repositories/notificationRepository';
import appConfig from '../config/app';
import Shopify from 'shopify-api-node';
import {isEmpty} from '@avada/utils';

export async function addDefaultSetting() {
  try {
    const currentSetting = await getSettings();
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
 * @param shopData
 * @returns {Promise<void>}
 */
export async function syncOrders(shopData) {
  try {
    const shopify = initShopify(shopData);
    const shopQuery = loadGraphQL('/order.graphql');
    const orderData = await shopify.graphql(shopQuery, {
      limit: 30
    });

    const notifications = orderData.orders.edges.map(async edge => {
      const order = edge.node;
      const address = order.shippingAddress || {};
      const lineItem = order.lineItems?.edges?.[0]?.node || {};
      const product = lineItem.product || {};
      const image = product.images?.edges?.[0]?.node || {};

      const productIdStr = await handleProductId(product.id);
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
  } catch (e) {
    console.error(e);
  }
}

/**
 *
 * @param productId
 * @returns {Promise<number|null>}
 */
export async function handleProductId(productId) {
  try {
    const productIdStr = productId?.split('/').pop();
    return productIdStr ? parseInt(productIdStr, 10) : null;
  } catch (e) {
    console.log('Failed to handle product id', e);
    return null;
  }
}

/**
 *
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function registerWebhook({shopifyDomain, accessToken}) {
  try {
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken
    });

    const currentWebhooks = await shopify.webhook.list();
    const unusedHooks = currentWebhooks.filter(
      webhook => !webhook.address.includes(appConfig.baseUrl)
    );

    if (!isEmpty(unusedHooks)) {
      await Promise.all(unusedHooks.map(hook => shopify.webhook.delete(hook.id)));
    }

    const webhooks = await shopify.webhook.list({
      address: `https://${appConfig.baseUrl}/webhook/order/new`
    });

    if (webhooks.length === 0) {
      return shopify.webhook.create({
        topic: 'orders/create',
        address: `https://${appConfig.baseUrl}/webhook/order/new`,
        format: 'json'
      });
    }
  } catch (error) {
    console.error('Failed to create webhook', error);
    throw error;
  }
}

/**
 *
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<void>}
 */
export async function registerScriptTag({shopifyDomain, accessToken}) {
  try {
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken
    });

    // await shopify.scriptTag.create({
    //   event: 'onload',
    //   src: `https://${appConfig.baseUrl}/scripttag/avada-sale-pop.min.js`
    // });
    // shopify.scriptTag.delete(222454513698);
    const scriptTags = await shopify.scriptTag.list();
    console.log(scriptTags);
  } catch (e) {
    console.log('Failed to create script tag', e);
  }
}
