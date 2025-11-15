import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1TvnaozakXnfDynRohebdZc_KIMgb1BI",
  authDomain: "healthy-pet-9a3ce.firebaseapp.com",
  projectId: "healthy-pet-9a3ce",
  storageBucket: "healthy-pet-9a3ce.firebasestorage.app",
  messagingSenderId: "438696912162",
  appId: "1:438696912162:web:ca14f0cb4552d5d7aaf17b",
  measurementId: "G-R02FVXPNTL",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
