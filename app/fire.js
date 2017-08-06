import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDG2lbteJHbbzDBn7-zi0iV067jI6MlTzU",
    authDomain: "blog-85188.firebaseapp.com",
    databaseURL: "https://blog-85188.firebaseio.com",
    projectId: "blog-85188",
    storageBucket: "blog-85188.appspot.com",
    messagingSenderId: "264881103342"
};
var fire = firebase.initializeApp(config);
export default fire;
