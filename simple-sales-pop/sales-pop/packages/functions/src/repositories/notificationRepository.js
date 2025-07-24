import {Firestore} from '@google-cloud/firestore';
import {presentNotifications} from '@functions/presenters/notificationsPresenter';

const firestore = new Firestore();
/** @type {CollectionReference} */
const collection = firestore.collection('notifications');

/**
 * @param shopId
 * @param query
 * @returns {Promise<{data: *[], total?: number, pageInfo: {hasNext: boolean, hasPre: boolean, totalPage?: number, lastVisible?: DocumentSnapshot}}>}
 */
export async function getNotifications({shopId, query = {}}) {
  try {
    const direction = query.sort || 'desc';
    const limit = Number(query.limit) || 10;
    const after = query.after;
    const before = query.before;

    let ref = collection.where('shopId', '==', shopId).orderBy('updatedAt', direction);

    if (after) {
      const afterDocSnap = await collection.doc(after).get();
      if (afterDocSnap.exists) {
        ref = ref.startAfter(afterDocSnap);
      }
    }

    if (before) {
      const beforeDocSnap = await collection.doc(before).get();
      if (beforeDocSnap.exists) {
        ref = ref.endBefore(beforeDocSnap);
      }
    }

    ref = ref.limit(limit);

    const snapshot = await ref.get();
    const docs = snapshot.docs;

    const data = presentNotifications(docs);

    const firstVisible = docs[0];
    const lastVisible = docs[docs.length - 1];

    let hasNext = false;
    let hasPre = false;

    if (lastVisible) {
      const nextRef = collection
        .where('shopId', '==', shopId)
        .orderBy('updatedAt', direction)
        .startAfter(lastVisible)
        .limit(1);

      const nextSnap = await nextRef.get();
      hasNext = !nextSnap.empty;
    }

    if (firstVisible) {
      const prevRef = collection
        .where('shopId', '==', shopId)
        .orderBy('updatedAt', direction)
        .endBefore(firstVisible)
        .limit(1);

      const prevSnap = await prevRef.get();
      hasPre = !prevSnap.empty;
    }

    return {
      data,
      pageInfo: {
        hasNext,
        hasPre,
        startCursor: firstVisible?.id || null,
        endCursor: lastVisible?.id || null
      }
    };
  } catch (e) {
    console.error('Error get notifications', e);
    return {
      data: [],
      pageInfo: {hasNext: false, hasPre: false}
    };
  }
}

/**
 *
 * @param shopId
 * @param notifications
 * @returns {Promise<void>}
 */
export async function addNotifications({shopId, notifications}) {
  console.log('Add notifications', notifications);
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
    console.log('Successfully add notifications');
  } catch (e) {
    console.log('Error add notifications', e);
  }
}

export async function createNotification({shopId, notification}) {
  try {
    const docRef = collection.doc();
    await docRef.set({
      ...notification,
      shopId,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Successfully create notification');
  } catch (e) {
    console.log('Error create notification', e);
  }
}

/**
 *
 * @param shopId
 * @returns {Promise<(T&{id: string})|{}>}
 */
export async function getNotificationByDomain(shopId = null) {
  try {
    const docSnap = await collection.where('shopId', '==', shopId).get();

    return presentNotifications(docSnap.docs);
  } catch (e) {
    console.log('Error get not', e);
    return {};
  }
}
