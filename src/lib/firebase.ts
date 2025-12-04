import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCm1EL2X8SigQ4O_VfWKUg3BFc6sBx3xqQ",
  authDomain: "colibri-d6148.firebaseapp.com",
  databaseURL: "https://colibri-d6148-default-rtdb.firebaseio.com",
  projectId: "colibri-d6148",
  storageBucket: "colibri-d6148.firebasestorage.app",
  messagingSenderId: "19026880720",
  appId: "1:19026880720:web:d39e8a8713d1e8d17456d5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export default app;
