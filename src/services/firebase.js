import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBSc9JAgYZb8hmmnClnVL2nzW2G2Y4xlD4",
  authDomain: "todo-list-8ec84.firebaseapp.com",
  projectId: "todo-list-8ec84",
  storageBucket: "todo-list-8ec84.appspot.com",
  messagingSenderId: "748259418465",
  appId: "1:748259418465:web:bac40636016c3aac2aa520",
  measurementId: "G-3CM8EFS781"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
