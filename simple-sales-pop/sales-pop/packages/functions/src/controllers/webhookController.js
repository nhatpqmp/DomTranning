import Shopify from 'shopify-api-node';
import {createNotification} from '@functions/repositories/notificationRepository';
import {getShopByShopifyDomain} from '@avada/core';
import {initShopify} from '../../lib/services/shopifyService';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopifyData = await initShopify(shop);

    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shopifyData.options.accessToken
    });

    const notification = await getNotificationItem(shopify, orderData);

    await createNotification({shopId: shop.id, notification});
    return (ctx.body = {
      success: true
    });
  } catch (err) {
    console.log('error while listening NewOrder', err);
    return (ctx.body = {
      success: false
    });
  }
}

/**
 *
 * @param shopify
 * @param orderData
 * @returns {Promise<[{orderId, name, totalPrice, customerName: (*|string), product: (null|{productId: *, productName: *, productImage, quantity: *}), createdAt}]>}
 */
export async function getNotificationItem(shopify, orderData) {
  const lineItem = orderData.line_items?.[0];

  const product = lineItem
    ? {
        productId: lineItem.product_id,
        productName: lineItem.title,
        productImage: lineItem.image_url || (lineItem.image && lineItem.image.src) || null,
        quantity: lineItem.quantity
      }
    : null;

  return [
    {
      orderId: orderData.id,
      name: orderData.name,
      totalPrice: orderData.total_price,
      customerName: orderData.customer?.first_name || 'Guest',
      product,
      createdAt: orderData.created_at
    }
  ];
}
