import { type FirebaseStorage, getStorage } from "@firebase/storage";
import { type FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import {
  type Auth,
  getAuth,
  initializeAuth,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

class FirebaseService {
  private static instance: FirebaseService;
  public app: FirebaseApp;
  public auth: Auth;
  public db: Firestore;
  public storage: FirebaseStorage;

  private constructor() {
    if (!getApps().length) {
      this.app = initializeApp(firebaseConfig);
      this.auth = initializeAuth(this.app, {});
    } else {
      this.app = getApp();
      this.auth = getAuth(this.app);
    }

    setPersistence(this.auth, browserLocalPersistence).catch((error) => {
      console.error("Erro ao salvar dados no localstorage:", error);
    });

    this.db = getFirestore(this.app);
    this.storage = getStorage(this.app);
  }

  public static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}

export const firebase = FirebaseService.getInstance();
