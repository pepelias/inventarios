import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCj6e01IRd6JxPfBmGKMWfYGKA8sI107A8',
  authDomain: 'inventory-mr.firebaseapp.com',
  projectId: 'inventory-mr',
  storageBucket: 'inventory-mr.appspot.com',
  messagingSenderId: '476289641852',
  appId: '1:476289641852:web:939c7fa198f5d176e508f9',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const database = getFirestore(app)
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
