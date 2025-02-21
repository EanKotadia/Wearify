const admin = require("firebase-admin");

const serviceAccount = require("../Secret/wearify-e2fa4-firebase-adminsdk-fbsvc-4e81f354f2.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://console.firebase.google.com/project/wearify-e2fa4/firestore/databases/",
});

const db = admin.firestore();
module.exports = { admin, db };
