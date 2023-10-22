import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from "firebase/storage";
// const { initializeApp:initializeAppFireStore,  } = require('firebase-admin/app');
// const { getFirestore,  } = require('firebase-admin/firestore');

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

// initializeAppFireStore();
// export const db = getFirestore();

export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
if (firebaseApp.name && typeof window !== 'undefined') {
    const analytics = getAnalytics(firebaseApp);
}