// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCR3sU_1SmNe8Ury7d_RAnbucw9zgPO0bE',
	authDomain: 'lib-mng-system.firebaseapp.com',
	projectId: 'lib-mng-system',
	storageBucket: 'lib-mng-system.appspot.com',
	messagingSenderId: '336612313557',
	appId: '1:336612313557:web:e8044db6dcb38a9c99155c',
	measurementId: 'G-33EYZBZTY8',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
