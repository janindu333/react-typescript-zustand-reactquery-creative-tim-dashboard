// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyB_u_jN6kTiWQdI55rO1KLiWXbChnA9XdQ",
    authDomain: "caregiver-fb48d.firebaseapp.com",
    projectId: "caregiver-fb48d",
    storageBucket: "caregiver-fb48d.appspot.com",
    messagingSenderId: "518839440232",
    appId: "1:518839440232:web:e492045daa00d77baabcdd"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { auth, db, messaging };
