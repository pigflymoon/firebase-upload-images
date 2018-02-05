import firebase from 'firebase';  // Initialize Firebase
var fireBaseconfig = {
    apiKey: "AIzaSyBHdEif0MF0SHVW-IuuIq1NXdW2dKWc_1A",
    authDomain: "cardmaker-bca47.firebaseapp.com",
    databaseURL: "https://cardmaker-bca47.firebaseio.com",
    projectId: "cardmaker-bca47",
    storageBucket: "cardmaker-bca47.appspot.com",
    messagingSenderId: "149962974009"
};
var firebaseApp = firebase.initializeApp(fireBaseconfig);

export default firebaseApp
