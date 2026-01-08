import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN1V89rGQqAzFsrg2PqpGlRDQdbT6TRcQ",
  authDomain: "campusmind-ai.firebaseapp.com",
  projectId: "campusmind-ai",
  storageBucket: "campusmind-ai.appspot.com",
  messagingSenderId: "114830376516",
  appId: "1:114830376516:web:e6329e5307c33096e30611"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
