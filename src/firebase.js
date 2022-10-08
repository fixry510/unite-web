import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyATX2udEUt_oyDqT1Ed49DBiQcjfOVmDPI",
    authDomain: "classroomunite.firebaseapp.com",
    databaseURL: "https://classroomunite-default-rtdb.firebaseio.com",
    projectId: "classroomunite",
    storageBucket: "classroomunite.appspot.com",
    messagingSenderId: "773958135661",
    appId: "1:773958135661:web:b2fd9923d46410847db464",
    measurementId: "G-Q7E8XEJCR8"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
