import firebase from 'firebase'
import 'firebase/firestore';

var config = {
    apiKey: "AIzaSyCj_h18MVQWhVF8PXdAqUbljz4y80dmLSE",
    authDomain: "presentvr.firebaseapp.com",
    databaseURL: "https://presentvr.firebaseio.com",
    projectId: "presentvr",
    storageBucket: "presentvr.appspot.com",
    messagingSenderId: "689893889506"
  };
firebase.initializeApp(config);

firebase.firestore().enablePersistence()
.then(function() {
    // Initialize Cloud Firestore through firebase
    var db = firebase.firestore();
    console.log("got firebase!")
})
.catch(function(err) {
    if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
        console.log("error, multiple tabs open!")
    } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
        console.log("error, current browser doesn't support")
    }
});

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
