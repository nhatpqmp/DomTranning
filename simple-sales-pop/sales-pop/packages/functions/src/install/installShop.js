import {shopifyApi} from '@shopify/shopify-api';
import {getFirestore} from 'firebase-admin/firestore';
import defaultSetting from './defaultSetting';

const db = getFirestore();

export async function installShop(shop, accessToken) {
  const settingSnap = await db.collection('settings').where('shopId', '==', shop).limit(1).get();
  if (!settingSnap.empty) {
    console.log(`[INSTALL SHOP] Shop ${shop} đã có dữ liệu, bỏ qua`);
    return;
  }

  const client = new shopifyApi.clients.Rest({shop, accessToken});
  const {body: orders} = await client.get({
    path: 'orders',
    query: {limit: 30, status: 'any', order: 'created_at desc'}
  });

  const batch = db.batch();

  orders.orders.forEach(order => {
    const docRef = db.collection('notifications').doc();
    batch.set(docRef, {
      shopId: shop,
      orderId: order.id,
      title: `Purchased ${order.line_items?.[0]?.title || 'a product'}`,
      location: order.customer?.default_address?.city || 'Unknown',
      timeAgo: order.created_at,
      source: 'Shopify',
      date: order.created_at,
      createdAt: new Date()
    });
  });

  const settingRef = db.collection('settings').doc();
  batch.set(settingRef, {
    shopId: shop,
    ...defaultSetting,
    createdAt: new Date()
  });

  await batch.commit();
  console.log(`Setup success.`);
}
