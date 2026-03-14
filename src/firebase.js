import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

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

export const messaging = getMessaging(app);

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      alert("Notification permission denied");
      return null;
    }
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    console.log("✅ FCM Token:", token);
    alert("Notifications enabled successfully!");
    return token;
  } catch (error) {
    console.error("❌ Error getting notification token:", error);
    return null;
  }
};

onMessage(messaging, (payload) => {
  console.log("📩 Foreground notification received:", payload);
});
