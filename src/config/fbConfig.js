import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD2PR39FSayZ9gk15wjA21P2-qdY7lOYRs",
    authDomain: "merhaba-5c1df.firebaseapp.com",
    databaseURL: "https://merhaba-5c1df.firebaseio.com",
    projectId: "merhaba-5c1df",
    storageBucket: "merhaba-5c1df.appspot.com",
    messagingSenderId: "114778734776",
    appId: "1:114778734776:web:2919c6c33bf40298"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.firestore().settings({timestampsInSnapshots:true});
  export default firebase;