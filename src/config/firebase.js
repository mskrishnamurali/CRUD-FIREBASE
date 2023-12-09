
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCX8WJayvmUVMEL6ebHnmG2rNw2m1qi9ss",
  authDomain: "fir-de3d0.firebaseapp.com",
  projectId: "fir-de3d0",
  storageBucket: "fir-de3d0.appspot.com",
  messagingSenderId: "388791880721",
  appId: "1:388791880721:web:633062ec95f40c9c8575b0",
  measurementId: "G-ZJDXT1GMGH"
};


const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)