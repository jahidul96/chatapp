import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../firebase.config";

export const getCurrentUser = async () => {
  const userRef = doc(db, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);
  let user;
  if (userSnap.exists()) {
    user = userSnap.data();
  } else {
    user = null;
  }
  // user && (user.uid = auth.currentUser.uid);
  // console.log(user);
  return user;
};

export const AllChatMate = (setFecthAllUsers) => {
  const usersRef = collection(db, "users");

  onSnapshot(usersRef, (querySnapshot) => {
    let users = [];
    querySnapshot.forEach((doc) => {
      users.push(doc.data());
    });

    setFecthAllUsers(users);
  });
};
export const getLastMsg = (id, setLastMsg) => {
  onSnapshot(doc(db, "lastMsg", id), (doc) => {
    setLastMsg(doc.data());
  });
};

export const getSpecificChat = (id, setMessages) => {
  const msgsRef = collection(db, "messages", id, "chat");
  const q = query(msgsRef, orderBy("createdAt", "asc"));
  onSnapshot(q, (querySnapshot) => {
    let msgs = [];
    querySnapshot.forEach((doc) => {
      msgs.push(doc.data());
    });
    setMessages(msgs);
  });
};

export const seenMesaage = async (id) => {
  const docRef = doc(db, "lastMsg", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(doc(db, "lastMsg", id), {
      read: true,
    });
  } else {
    console.log("no data ");
  }
};

export const addMessage = async (data, id) => {
  await addDoc(collection(db, "messages", id, "chat"), data);
};
export const setLastMessage = async (data, id) => {
  await setDoc(doc(db, "lastMsg", id), data);
};

export const uploadFileToStorage = (image) => {
  const promise = new Promise(async (resolve, reject) => {
    const imgFile = await (await fetch(image)).blob();
    const imagesRef = ref(storage, `images/${imgFile._data.name}`);
    const uploadTask = uploadBytesResumable(imagesRef, imgFile);
    return uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        });
      }
    );
  });

  return promise;
};
