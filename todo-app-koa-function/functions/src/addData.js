const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
(async () => {
    const todoRef = db.collection('todos');
    await todoRef.add({
        userId: 1,
        id: 5,
        title: 'Test dasdasdas',
        completed: false,
    });

})();