import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "campusmind-ai.firebaseapp.com",
  projectId: "campusmind-ai",
  storageBucket: "campusmind-ai.appspot.com",
  messagingSenderId: "114830376516",
  appId: "1:114830376516:web:e6329e5307c33096e30611",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Notification permission - safe version without messaging SDK
export const requestNotificationPermission = async () => {
  try {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return null;
    }
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      console.log('Notification permission granted');
    }
    return permission;
  } catch (error) {
    console.error('Notification error:', error);
    return null;
  }
};
