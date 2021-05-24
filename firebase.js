import firebase from "firebase"
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBIrQh3XhW8P7O8ZJ_-uaXz-qH3lOU7qyI",
    authDomain: "fb-clone-de11b.firebaseapp.com",
    projectId: "fb-clone-de11b",
    storageBucket: "fb-clone-de11b.appspot.com",
    messagingSenderId: "699149656764",
    appId: "1:699149656764:web:57f8a3bf2653f175aaa6b9"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();
const storage = firebase.storage();

export { db, storage }