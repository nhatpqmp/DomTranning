import {createNotification} from '@functions/repositories/notificationRepository';
import {getShopByShopifyDomain} from '@avada/core';
import {initShopify} from '../../lib/services/shopifyService';

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean}>}
 */
export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = initShopify(shop);

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
 * todo: move to shopify service
 * @param shopify
 * @param orderData
 * @returns {Promise<{firstName, city, country, productName, productId, productImage, timestamp}>}
 */
export async function getNotificationItem(shopify, orderData) {
  const lineItem = orderData.line_items?.[0];
  const shippingAddress = orderData.shipping_address || {};
  const productId = lineItem?.product_id;

  let productImage = null;

  if (productId) {
    try {
      const product = await shopify.product.get(productId);
      productImage = product?.image?.src || null;
    } catch (err) {
      console.error('Failed to fetch product image:', err);
    }
  }

  return {
    firstName: orderData.customer?.first_name || 'Guest',
    city: shippingAddress.city || '',
    country: shippingAddress.country || '',
    productName: lineItem?.title || '',
    productId: productId,
    productImage: productImage,
    timestamp: new Date(orderData.created_at)
  };
}
