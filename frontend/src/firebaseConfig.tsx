import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDOsrPSX49Dp-OfVNEvyEGDCO6CBCL5sVY",
    authDomain: "fluted-oasis-353318.firebaseapp.com",
    projectId: "fluted-oasis-353318",
    storageBucket: "fluted-oasis-353318.appspot.com",
    messagingSenderId: "883449637885",
    appId: "1:883449637885:web:59544ad7f2eab984348794",
    measurementId: "G-TH9SJ2QR4K"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const firestore = getFirestore(app);

export { storage, firestore };