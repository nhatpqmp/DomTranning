export async function createWebhooks(shopify, shopId) {
  try {
    const webhook = await registerWebhook(shopify.config.shopName, shopify.config.accessToken);
    console.log('Webhook created:', webhook.address);
    return webhook;
  } catch (error) {
    console.error('Failed to create webhook', error);
    throw error;
  }
}

/**
 * @param shopifyDomain
 * @param accessToken
 * @returns {Promise<Shopify.IWebhook>}
 */
export async function registerWebhook(shopifyDomain, accessToken) {
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
}
