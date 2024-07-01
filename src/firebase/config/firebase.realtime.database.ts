import { firebaseConfigs } from '@Config/firebase.config';
import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

const app = initializeApp(firebaseConfigs.realtimeDatabase);
export const firebaseDatabase: Database = getDatabase(app);
