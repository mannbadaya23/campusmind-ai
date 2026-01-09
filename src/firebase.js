import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// 🔧 Firebase configuration (SAFE)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "campusmind-ai.firebaseapp.com",
  projectId: "campusmind-ai",
  storageBucket: "campusmind-ai.appspot.com",
  messagingSenderId: "114830376516",
  appId: "1:114830376516:web:e6329e5307c33096e30611",
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Firebase Auth
export const auth = getAuth(app);

// 🔔 Firebase Messaging
export const messaging = getMessaging(app);

// 🔔 Request notification permission + get FCM token
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

// 📩 Handle foreground messages (in-app)
onMessage(messaging, (payload) => {
  console.log("📩 Foreground notification received:", payload);
});
