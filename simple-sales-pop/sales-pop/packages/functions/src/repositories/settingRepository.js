import {Firestore} from '@google-cloud/firestore';
import defaultSetting from '@functions/install/defaultSetting';

const firestore = new Firestore();
/** @type {CollectionReference} */
const collection = firestore.collection('settings');

/**
 *
 * @param shopId
 * @returns {Promise<{[p: string]: FirebaseFirestore.DocumentFieldValue, id: string}|*[]>}
 */
export async function getSetting(shopId) {
  try {
    const docSnap = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get();

    const doc = docSnap.docs[0];

    if (docSnap.empty || docSnap.docs.length === 0) {
      console.log('Setting not found');
    }

    return {id: doc.id, ...doc.data()};
  } catch (e) {
    console.log('Error get setting', e);
    return defaultSetting;
  }
}

/**
 * @param id
 * @param data
 * @returns {Promise<void>}
 */
export async function updateSetting(id, data) {
  try {
    await collection.doc(id).update({
      ...data,
      updatedAt: new Date()
    });
  } catch (e) {
    console.log('Error update setting', e);
  }
}

/**
 * Create setting
 * @param data
 * @returns {Promise<void>}
 */
export async function createSetting(data) {
  try {
    await collection.add({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (e) {
    console.log('Error create setting', e);
  }
}
