// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkYhagMO50SD_qYEU31YOkzcgJZ9qf1Qc",
  authDomain: "employee-management-e961d.firebaseapp.com",
  projectId: "employee-management-e961d",
  storageBucket: "employee-management-e961d.appspot.com",
  messagingSenderId: "314779169817",
  appId: "1:314779169817:web:3b19f0ee7847bb4df96688",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
