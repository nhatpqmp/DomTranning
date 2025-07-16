import {Firestore} from '@google-cloud/firestore';
import {getShopByShopifyDomain} from '@avada/core';

const firestore = new Firestore();
/** @type {CollectionReference} */
const collection = firestore.collection('notifications');

export async function list(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationByDomain(shopifyDomain);

    return (ctx.body = {
      data: notifications
    });
  } catch (e) {
    return (ctx.body = {data: [], error: e.message});
  }
}

/**
 *
 * @param shopifyDomain
 * @returns {Promise<(T&{id: string})|{}>}
 */
export async function getNotificationByDomain(shopifyDomain) {
  try {
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const docSnap = await collection
      .where('shopId', '==', shop.id)
      .limit(1)
      .get();

    const doc = docSnap.docs[0];

    if (docSnap.empty || docSnap.docs.length === 0) {
      console.log('Notification not found');
    }

    return {id: doc.id, ...doc.data()};
  } catch (e) {
    console.log('Error get not', e);
    return {};
  }
}
