import Shopify from 'shopify-api-node';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.request.body;
    // const shop = getShopByShopifyDomain()
    const shop = getByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    const notification = await getNotificationItem(shopify, orderData);
    await addNotification({shopId: shop.id, shopifyDomain, data: notification});
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

export async function getNotificationItem(shopify, orderData) {
  const lineItems = orderData.line_items || [];

  const products = lineItems.map(item => ({
    productId: item.product_id,
    productName: item.title,
    productImage: item.image_url || (item.image && item.image.src) || null,
    quantity: item.quantity
  }));

  return {
    orderId: orderData.id,
    name: orderData.name,
    totalPrice: orderData.total_price,
    customerName: orderData.customer?.first_name || 'Guest',
    products,
    createdAt: orderData.created_at
  };
}
