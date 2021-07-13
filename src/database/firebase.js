import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCN4q8n6GW68CWLwtFul-zIrGdOWPR2_gM",
  authDomain: "clone--drive.firebaseapp.com",
  projectId: "clone--drive",
  storageBucket: "clone--drive.appspot.com",
  messagingSenderId: "1072510998933",
  appId: "1:1072510998933:web:b135a0e6f02263df933e9c",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
