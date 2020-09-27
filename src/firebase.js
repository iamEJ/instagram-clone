import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDjhMNfueIeYMv7aQq-NhvHGsdGDCoqUME",
  authDomain: "instagram-clone-4c2aa.firebaseapp.com",
  databaseURL: "https://instagram-clone-4c2aa.firebaseio.com",
  projectId: "instagram-clone-4c2aa",
  storageBucket: "instagram-clone-4c2aa.appspot.com",
  messagingSenderId: "720656310191",
  appId: "1:720656310191:web:1a5e8b8698e6703835595a",
  measurementId: "G-PL402CG0YH",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { auth, storage };
export default db;
