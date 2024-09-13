import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebaseConfig from "../config/firebaseConfig";

const fireBaseApp = initializeApp(firebaseConfig);

const auth = getAuth(fireBaseApp);

const db = getFirestore(fireBaseApp);

export {auth, db};