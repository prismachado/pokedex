import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD72ZjR2hBL9X2wNNp3totUqPt53wOse5k",
  authDomain: "pokedex-784c4.firebaseapp.com",
  projectId: "pokedex-784c4",
  storageBucket: "pokedex-784c4.appspot.com",
  messagingSenderId: "578891292283",
  appId: "1:578891292283:web:245090041a6ed5b0b0ccde",
  measurementId: "G-W206YMP9B6",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
