"use strict";

var messenger = (function() {
    function Messenger() {
    }

    var config = {
        apiKey: "AIzaSyD4wjBH_zXgZJfcmLrY7EO8jKgwFTwq9BE",
        authDomain: "forgotten-future.firebaseapp.com",
        databaseURL: "https://forgotten-future.firebaseio.com",
        projectId: "forgotten-future",
        storageBucket: "",
        messagingSenderId: "249322981702"
    };

    var clientToken = null;
    var clientTopics = (localStorage.getItem('messenger.topics') || '').split(', ');

    // Messenger.prototype.requestNotificationPermission = unavailable;
    // Messenger.prototype.getNotificationToken = unavailable;
    // Messenger.prototype.subscribe = unavailable;

    site.includeScript('https://www.gstatic.com/firebasejs/4.9.0/firebase.js', function() {

//     document.addEventListener("DOMContentLoaded", function() {

        // Push notifications

        if(firebase) {
            // Initialize Firebase
            firebase.initializeApp(config);
            // navigator.serviceWorker.getRegistrations().then(function(registrations) {
            //     for(let registration of registrations) {
            //         registration.unregister();
            //         console.log("UNREGISTER ", registration);
            //     } })
            navigator.serviceWorker.register('ffsite/messenger/messenger-worker.js')
                .then(function(registration) {
                    var messaging = firebase.messaging();
                    messaging.useServiceWorker(registration);
                    messaging.getToken()
                        .then(function (existingToken) {
                            console.log('Existing Token found:', existingToken);
                            if(existingToken)
                                clientToken = existingToken;
                            updateSubscriptionUI();
                        })
                        .catch(function (err) {
                            console.log('Unable to retrieve existing token ', err);
                        });

                    // Callback fired if Instance ID token is updated.
                    messaging.onTokenRefresh(function () {
                        messaging.getToken()
                            .then(function (refreshedToken) {
                                console.log('Token refreshed:', refreshedToken);
                                if(refreshedToken)
                                    clientToken = refreshedToken;


                                // sendTokenToServer(refreshedToken);
                            })
                            .catch(function (err) {
                                console.log('Unable to retrieve refreshed token ', err);
                                // showToken('Unable to retrieve refreshed token ', err);
                            });
                    });

                });

            Messenger.prototype.requestNotificationPermission = function(callback) {
                // var messaging = firebase.messaging();
                messaging.requestPermission()
                    .then(function () {
                        if(callback)
                            callback();
                        console.log('Notification permission granted.');
                        // TODO(developer): Retrieve an Instance ID token for use with FCM.
                        // ...
                    })
                    .catch(function (err) {
                        if(callback)
                            callback(err);
                        console.log('Unable to get permission to notify.', err);
                    });
            };

            Messenger.prototype.getNotificationToken = function(callback) {
                // var messaging = firebase.messaging();
                // Get Instance ID token. Initially this makes a network call, once retrieved
                // subsequent calls to getToken will return from cache.
                messaging.getToken()
                    .then(function (currentToken) {
                        if (currentToken) {
                            callback(currentToken);

                        } else {
                            callback(null, new Error('No Instance ID token available. Request permission to generate one.'));
                        }
                    })
                    .catch(function (err) {
                        callback(null, err);
                        console.log('An error occurred while retrieving token. ', err);
                    });
            };

            Messenger.prototype.subscribe = function (topics) {
                clientTopics = topics;
                localStorage.setItem('messenger.topics', topics.join(', '));
                console.log("Requesting permission for notification");
                messenger.requestNotificationPermission(function () {
                    console.log("Requesting notification token");
                    messenger.getNotificationToken(function(token, err) {
                        if(err) {
                            // console.error("Error requesting notification token: ", err);
                            clientToken = null;
                            throw err;
                        }

                        if(token) {
                            clientToken = token;
                            updateSubscriptionUI();
                            console.info("Subscribed to topics: ", topics, " with token ", token);
                            sendTokenToServer(token, topics);
                            // updateUIForPushEnabled(currentToken);

                        } else {
                            // Show permission request.
                            console.log('No Instance ID token available. Request permission to generate one.');
                            // Show permission UI.
                            // updateUIForPushPermissionRequired();
                            // setTokenSentToServer(false);
                        }
                    })
                })
            }
        }

//     });

    });

    function updateSubscriptionUI() {
        var UI = [
            ['subscription-topic-news', 'news'],
            ['subscription-topic-dev', 'dev']
        ];

        var checked = clientTopics.length > 0;
        for(var i=0; i<UI.length; i++) {
            var elms = document.getElementsByName(UI[i][0]);
            for(var j=0; j<elms.length; j++) {
                elms[j].checked = clientTopics.indexOf(UI[i][1]) !== -1;
            }
        }
    }

    function sendTokenToServer(token, topics) {
        // Send Instance ID token to server.
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "ffsite/messenger/api.php");
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify({
            action: 'subscribe',
            token:  token,
            topics: topics.join(", ")
        }));
        xmlhttp.onreadystatechange = function () {
            if(xmlhttp.readyState === XMLHttpRequest.DONE) {
                var json = JSON.parse(xmlhttp.responseText);
                if(xmlhttp.status === 200) {
                    console.log(xmlhttp.responseText);
                } else if (xmlhttp.status === 409) {
                    console.warn('Token already registered: ' + xmlhttp.responseText);
                } else {
                    console.error(xmlhttp.responseText);
                }
            }
        };
    }

    function unavailable() {
        throw new Error("Unavailable");
    }
    return new Messenger;
})();
