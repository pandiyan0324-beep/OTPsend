import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA1YW8UzodJ0csoyOmzzN9jymAAbo6GGvA",
  authDomain: "reactive-otp.firebaseapp.com",
  projectId: "reactive-otp",
  storageBucket: "reactive-otp.firebasestorage.app",
  messagingSenderId: "976444682102",
  appId: "1:976444682102:web:57600a1b02fdcc8e7e1457",
  measurementId: "G-H946FEKPCH"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { auth, RecaptchaVerifier, signInWithPhoneNumber };
