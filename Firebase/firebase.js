import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBcmzB9aI7XOIILw2HEh1IWWDlcqlecNaM",
    authDomain: "wearify-e2fa4.firebaseapp.com",
    projectId: "wearify-e2fa4",
    storageBucket: "wearify-e2fa4.firebasestorage.app",
    messagingSenderId: "497631107364",
    appId: "1:497631107364:web:161ebe499f20899e5c7bb1",
    measurementId: "G-6QYBDVBEHX"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
