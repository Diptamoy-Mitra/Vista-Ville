// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQGojRpZtxDt2IuVh-mrF6BeTK5rKudYQ",
  authDomain: "realtor-clone-react-13183.firebaseapp.com",
  projectId: "realtor-clone-react-13183",
  storageBucket: "realtor-clone-react-13183.appspot.com",
  messagingSenderId: "544682277608",
  appId: "1:544682277608:web:944924c3c8b42d4638275d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore();