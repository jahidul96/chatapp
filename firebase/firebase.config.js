import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyCeSQ6z-fwZNJ6U7UDFhqQIdHh6tkmlEWE",
	authDomain: "tuorgang.firebaseapp.com",
	projectId: "tuorgang",
	storageBucket: "tuorgang.appspot.com",
	messagingSenderId: "186485655222",
	appId: "1:186485655222:web:ec89cdf59e4f0fef468817",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
