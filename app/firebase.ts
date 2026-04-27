import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIFZvzqB-e9Lg6HvlbKxIChnKeoYrE0IA",
  authDomain: "as2web-2ea21.firebaseapp.com",
  projectId: "as2web-2ea21",
  storageBucket: "as2web-2ea21.firebasestorage.app",
  messagingSenderId: "122434419632",
  appId: "1:122434419632:web:ff60677c8709b88365b475"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export default firebase;
