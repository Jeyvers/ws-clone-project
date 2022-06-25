// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCiEFklsZcr89tUiRjG9J8LwurqPzqHYDY',
  authDomain: 'ws-clone-project.firebaseapp.com',
  projectId: 'ws-clone-project',
  storageBucket: 'ws-clone-project.appspot.com',
  messagingSenderId: '99600986023',
  appId: '1:99600986023:web:8e142f19c4d36ba6631082',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, provider, auth };
