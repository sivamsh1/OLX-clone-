
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import 'firebase/auth'
import { getStorage } from "firebase/storage";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc943R9gfMH_Z0TZZi9NVv53J0sZwALmI",
  authDomain: "project-1-5a17c.firebaseapp.com",
  projectId: "project-1-5a17c",
  storageBucket: "project-1-5a17c.appspot.com",
  messagingSenderId: "206285256964",
  appId: "1:206285256964:web:011ee2ce82356ca7dff851",
  measurementId: "G-6WTRY55H7F"
};

// Initialize Firebase
 const app  = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;