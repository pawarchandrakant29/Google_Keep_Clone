import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCXeZIvMR1OcHLm9wBgISMBSzooMfxzHmg",
  authDomain: "keep-clone-2cd42.firebaseapp.com",
  projectId: "keep-clone-2cd42",
  storageBucket: "keep-clone-2cd42.appspot.com",
  messagingSenderId: "696021417302",
  appId: "1:696021417302:web:989baa93150b5c17c22af7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export const auth = getAuth(app);
