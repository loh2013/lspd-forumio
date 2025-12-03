
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- ВСТАВЬТЕ СЮДА ДАННЫЕ ИЗ КОНСОЛИ FIREBASE ---
const firebaseConfig = {
  apiKey: "ВСТАВЬТЕ_СВОЙ_API_KEY",
  authDomain: "ВСТАВЬТЕ_СВОЙ_PROJECT_ID.firebaseapp.com",
  projectId: "ВСТАВЬТЕ_СВОЙ_PROJECT_ID",
  storageBucket: "ВСТАВЬТЕ_СВОЙ_PROJECT_ID.appspot.com",
  messagingSenderId: "ВАШ_ID",
  appId: "ВАШ_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
