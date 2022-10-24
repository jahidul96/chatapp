import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Alert } from "react-native";
import { auth } from "../firebase.config";

export const fbUserRegister = (email, password) => {
  return new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((info) => {
        resolve(info);
        Alert.alert("USER CREATED SUCCESFULLY");
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const signinWithFb = (email, password) => {
  return new Promise(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        resolve(user);
        Alert.alert("WELCOME BACK!");
      })
      .catch((err) => {
        reject(err);
      });
  });
};
