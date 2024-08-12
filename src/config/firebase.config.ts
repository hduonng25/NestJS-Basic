import { FirebaseConfigType, FirestoreDatabaseConfigType } from '@Config/types/firebase.config.type';
import { registerAs } from '@nestjs/config';
import 'dotenv/config';
import process from 'process';

export const firebaseConfigs: FirebaseConfigType = {
    realtimeDatabase: {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    },

    firestoreDatabase: JSON.parse(process.env.FIREBASE_FIRESTORE_ADMIN) as FirestoreDatabaseConfigType,
};

export default registerAs<FirebaseConfigType>('firebase', (): FirebaseConfigType => firebaseConfigs);
