// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc

} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSGS2Sq94I4AOMzP86fJfCXHSL6LcA_mc",
  authDomain: "santra-db.firebaseapp.com",
  projectId: "santra-db",
  storageBucket: "santra-db.appspot.com",
  messagingSenderId: "1025298364448",
  appId: "1:1025298364448:web:b02f98e427c555c3b5e445"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters(
    {
        prompt: 'select_account'
    }
);

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password)
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password)
}

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

if(!userSnapshot.exists()){
  const {displayName, email} = userAuth;
  const createdAt = new Date();
  try{
    await setDoc(userDocRef, {
      displayName,
      email, createdAt,
      ...additionalInformation,
    });
  }
  catch(error) {
    console.log('error creating the user', error.message);
  }
}
return userDocRef;
}
