import {Firestore} from '@google-cloud/firestore';

const firestore = new Firestore();
/** @type {CollectionReference} */
const collection = firestore.collection('settings');

/**
 *
 * @param shopId
 * @returns {Promise<{[p: string]: FirebaseFirestore.DocumentFieldValue, id: string}|*[]>}
 */
export async function getSetting(shopId) {
  const docSnap = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();

  const doc = docSnap.docs[0];

  if (docSnap.empty || docSnap.docs.length === 0) {
    throw new Error(`Setting not found for shopId: ${shopId}`);
  }

  return {id: doc.id, ...doc.data()};
}

/**
 * @param id
 * @param data
 * @returns {Promise<void>}
 */
export async function updateSetting(id, data) {
  await collection.doc(id).update({
    ...data,
    updatedAt: new Date()
  });
}
