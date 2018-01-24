importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/4.1.1/firebase.js');


var config = {
    apiKey: "AIzaSyD4wjBH_zXgZJfcmLrY7EO8jKgwFTwq9BE",
    authDomain: "forgotten-future.firebaseapp.com",
    databaseURL: "https://forgotten-future.firebaseio.com",
    projectId: "forgotten-future",
    storageBucket: "",
    messagingSenderId: "249322981702"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
console.log('[messenger-worker.js] initiated ', firebase);

messaging.setBackgroundMessageHandler(function(payload) {
    console.log('[messenger-worker.js] Received background message: ', payload);
    var data = payload.data || {};

    return self.registration.showNotification(
        data.title,
        data.options
    );
});