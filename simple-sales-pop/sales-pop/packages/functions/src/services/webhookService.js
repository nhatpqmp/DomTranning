import appConfig from '../config/app';
import Shopify from 'shopify-api-node';
import {isEmpty} from '@avada/utils';

/**
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function registerWebhook(shopifyDomain, accessToken) {
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
