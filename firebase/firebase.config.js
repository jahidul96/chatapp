import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAi1z8duFbc1wbPTzviutTjDiJreZ_tJw0",
	authDomain: "rnchatapp-852e1.firebaseapp.com",
	projectId: "rnchatapp-852e1",
	storageBucket: "rnchatapp-852e1.appspot.com",
	messagingSenderId: "532046377825",
	appId: "1:532046377825:web:c1af1ef7d5966e0184cb20",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
