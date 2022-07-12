import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAZYEnzxyoqVIvsboYerYZG27unusw-rZ8",
    authDomain: "nwitter-acfa1.firebaseapp.com",
    projectId: "nwitter-acfa1",
    storageBucket: "nwitter-acfa1.appspot.com",
    messagingSenderId: "61826197484",
    appId: "1:61826197484:web:7aca6652ad22862c36c2c9"
  };

  firebase.initializeApp(firebaseConfig);

  export const firebaseInstance = firebase;

  export const authService = firebase.auth();
  export const dbService = firebase.firestore();
  export const storageService = getStorage();

