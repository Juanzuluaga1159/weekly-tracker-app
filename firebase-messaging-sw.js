importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDJjE_hn4ewp3J26-fRacHTQfvEMYesFyA",
  authDomain: "trackly-4b946.firebaseapp.com",
  projectId: "trackly-4b946",
  storageBucket: "trackly-4b946.firebasestorage.app",
  messagingSenderId: "1055095575674",
  appId: "1:1055095575674:web:bbfa360edeedd547b557c3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icons/icon-192.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});