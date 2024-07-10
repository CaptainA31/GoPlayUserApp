// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyATme-2bAzKYDjGmScwUEcQu-npiYD67cM",
    authDomain: "goplayuserapp.firebaseapp.com",
    projectId: "goplayuserapp",
    storageBucket: "goplayuserapp.appspot.com",
    messagingSenderId: "259174589064",
    appId: "1:259174589064:web:d63a213052ce55190a753d",
    measurementId: "G-ZRVLGR29T5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
