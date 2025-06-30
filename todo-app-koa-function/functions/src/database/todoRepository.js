const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccount.json');

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const db = admin.firestore();
const todosCol = db.collection('todos');

async function getAll() {
    const snapshot = await todosCol.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

async function getOne(id) {
    const docRef = todosCol.doc(id);
    const docSnap = await docRef.get();
    if (!docSnap.exists) throw new Error('Todo not found');
    return { id: docSnap.id, ...docSnap.data() };
}

async function add(data) {
    const docRef = todosCol.doc(data.id.toString());
    await docRef.set(data);
}

async function update(id, updatedData) {
    const docRef = todosCol.doc(id.toString());
    await docRef.update(updatedData);
}

async function remove(id) {
    const docRef = todosCol.doc(id.toString());
    await docRef.delete();
}

module.exports = {
    getAll,
    getOne,
    add,
    update,
    remove
};
