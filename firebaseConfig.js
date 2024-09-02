import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBI8qp7PC2isi63t3n-VVGAwyK1FcQR-Ls",
  authDomain: "birthday-manager-20737.firebaseapp.com",
  projectId: "birthday-manager-20737",
  storageBucket: "birthday-manager-20737.appspot.com",
  messagingSenderId: "70493404941",
  appId: "1:70493404941:web:8eefa8aa533eb7bb04ba44",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
