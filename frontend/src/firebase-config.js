import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAelJ7dlq9btLTsRbGRQKj8p1XRrlo8cVo",
    authDomain: "codewave-39524.firebaseapp.com",
    projectId: "codewave-39524",
    storageBucket: "codewave-39524.appspot.com",
    messagingSenderId: "1035711570286",
    appId: "1:1035711570286:web:784b4042cc0cd42cac617f",
    measurementId: "G-5C37XVK0HF"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth();
const storage = getStorage();

export { app, auth , storage };