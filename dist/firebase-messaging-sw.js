importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// IMPORTANT: these values are NOT secrets
firebase.initializeApp({
  apiKey: "dummy",
  authDomain: "dummy",
  projectId: "dummy",
  messagingSenderId: "dummy",
  appId: "dummy",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] Background message received:", payload);

  self.registration.showNotification(
    payload.notification?.title || "Notification",
    {
      body: payload.notification?.body || "You have a new message",
    }
  );
});
