import {Firestore} from '@google-cloud/firestore';
import moment from 'moment';
import {formatDateFields} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type {CollectionReference} */
const collection = firestore.collection('notifications');

/**
 * @param shopId
 * @param query
 * @returns {Promise<{data: *[], total?: number, pageInfo: {hasNext: boolean, hasPre: boolean, totalPage?: number}}>}
 */
export async function getNotifications(shopId, query = {}) {
  const snapshot = await collection.where('shopId', '==', shopId).get();
  return snapshot.docs.map(doc => {
    const data = formatDateFields(doc.data());
    const date = data.timestamp ? moment(data.timestamp).format('MMM DD YY') : '';
    const dayAgo = data.timestamp ? moment(data.timestamp).fromNow() : '';
    return {
      ...data,
      id: doc.id,
      date,
      dayAgo
    };
  });
}

/**
 *
 * @param shopId
 * @param notifications
 * @returns {Promise<void>}
 */
export async function addNotifications(shopId, notifications = []) {
  if (!notifications.length) return;

  try {
    const batch = firestore.batch();

    notifications.forEach(item => {
      const docRef = collection.doc();
      batch.set(docRef, {
        ...item,
        shopId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    });

    await batch.commit();
  } catch (e) {
    console.log('Error add notifications', e);
  }
}
