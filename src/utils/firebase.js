import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKn5SlnuU392bjI1cnrF26CWS8y4JG0nw",
  authDomain: "triviagora.firebaseapp.com",
  projectId: "triviagora",
  storageBucket: "triviagora.appspot.com",
  messagingSenderId: "447610443568",
  appId: "1:447610443568:web:e9794cc36aadbe2a1fdaf5",
};

// 啟動 Firebase
export const app = initializeApp(firebaseConfig);
// 把驗證功能匯出
export const auth = getAuth(app);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
