import type { FirebaseOptions } from 'firebase/app'

const isAppInProdMode = import.meta.env.VITE_CURRENT_APP_MODE === 'prod'

export const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
}

export const collectionPath = isAppInProdMode
  ? import.meta.env.VITE_FIREBASE_PROD_COLLECTION_PATH
  : import.meta.env.VITE_FIREBASE_DEVELOP_COLLECTION_PATH
