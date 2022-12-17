// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtywRfTfgAwpB4uJHN767U83GkWcPFCDQ",
    authDomain: "databasedummyproject.firebaseapp.com",
    databaseURL: "https://databasedummyproject-default-rtdb.firebaseio.com",
    projectId: "databasedummyproject",
    storageBucket: "databasedummyproject.appspot.com",
    messagingSenderId: "310794197085",
    appId: "1:310794197085:web:38531917122de9627395b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth();
const signUp = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            email: user.email,
        });
        return user.uid
    } catch (error) {
        return { error: error.message }
    }
};

const signIn = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        const user = userCredential.user;
        return user.uid
    } catch (error) {
        return { error: error.message }
    }
};
const signingOut = async () => {
    try {
        await signOut(auth)
        localStorage.removeItem("user_uid");
        return true
    } catch (error) {
        return false
    }
};
export {
    auth,
    db,
    signIn,
    signUp,
    signingOut
}

