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
    try {
        const snapshot = await todosCol.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.log('error getting all todos', e);
    }
}

async function getOne(id) {
    try {
        const docRef = todosCol.doc(id);
        const docSnap = await docRef.get();
        if (!docSnap.exists) console.log('Todo not found');
        return { id: docSnap.id, ...docSnap.data() };
    } catch (e) {
        console.error('Error getting todo', e);
    }

}

async function add(data) {
    try {
        const docRef = await todosCol.add(data);
        console.log('Document written with ID: ', docRef.id);
    } catch (e) {
        console.error('Error adding todo: ', e);
    }
}

async function update(id, updatedData) {
    try {
        const docRef = todosCol.doc(id);
        await docRef.update(updatedData);
    } catch (e) {
        console.error('Error updating todo: ', e);
    }
}

async function remove(id) {
    try {
        const docRef = todosCol.doc(id);
        await docRef.delete();
    } catch (e) {
        console.error('Error deleting todo: ', e);
    }
}

module.exports = {
    getAll,
    getOne,
    add,
    update,
    remove
};
