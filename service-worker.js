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

const CACHE_NAME = "weekly-tracker-cache-v25";

const urlsToCache = [
  "./",
  "index.html",
  "tracker.html",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

messaging.onBackgroundMessage(function(payload) {
  const notificationTitle = payload.notification?.title || "Recordatorio";
  const notificationOptions = {
    body: payload.notification?.body || "Tenés una tarea pendiente",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: {
      url: "/tracker.html"
    }
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function(event) {
  event.notification.close();

  event.waitUntil(
    clients.openWindow(event.notification?.data?.url || "/tracker.html")
  );
});












