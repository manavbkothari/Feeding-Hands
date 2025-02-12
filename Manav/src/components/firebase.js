// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCa8m8M3ictAnXpu76_-aNNbahd4HzGBQc",
//   authDomain: "urban-food-waste-management.firebaseapp.com",
//   projectId: "urban-food-waste-management",
//   storageBucket: "urban-food-waste-management.firebasestorage.app",
//   messagingSenderId: "629267443081",
//   appId: "1:629267443081:web:1ef1319b67e2f7b9a98558",
//   measurementId: "G-H0P98EZ674",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Export the Firebase app instance
// export { app };

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {

// };

// Initialize Firebase
// Import Firebase dependencies
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken } from "firebase/messaging";

// 🔹 Firebase Configuration (MUST be declared first)
const firebaseConfig = {
  apiKey: "AIzaSyDxaIF_ariObjFWtxC-_XAlqQ831YnwOZ4",
  authDomain: "food-donation-alert.firebaseapp.com",
  projectId: "food-donation-alert",
  storageBucket: "food-donation-alert.appspot.com",
  messagingSenderId: "733748401427",
  appId: "1:733748401427:web:648ddda6dbaf5b91a8f6e6",
  measurementId: "G-0M0GGZ6WLB",
};

// 🔹 Initialize Firebase only if not already initialized
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

// 🔹 Function to Request Notification Permission
export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: "YOUR_VAPID_PUBLIC_KEY",
      });
      console.log("✅ FCM Token:", token);
      return token;
    } else {
      console.warn("❌ Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("⚠️ Error getting FCM token:", error);
    return null;
  }
};

// Export Firebase instances
export { app, analytics, messaging };
