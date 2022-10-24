import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input, TopComp } from "../components/Reuse";
import { COLORS } from "../Color/Coolor";
import ImageIcon from "react-native-vector-icons/Feather";
import CloseIcon from "react-native-vector-icons/Feather";
import SendIcon from "react-native-vector-icons/Ionicons";
import { auth, db, storage } from "../../firebase/firebase.config";
import * as ImagePicker from "expo-image-picker";

import { Timestamp } from "firebase/firestore";
import Messages from "../components/Messages";
import {
  addMessage,
  getSpecificChat,
  seenMesaage,
  setLastMessage,
  uploadFileToStorage,
} from "../../firebase/fireStore/FirestoreFb";

const Chat = ({ navigation, route }) => {
  const user = route.params;
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [image, setImage] = useState(null);

  const userMe = auth.currentUser;
  const id =
    userMe.uid > user?.uid
      ? `${userMe.uid + user?.uid}`
      : `${user?.uid + userMe.uid}`;

  const sendText = async (img) => {
    const data = {
      text: text || null,
      from: userMe.email,
      to: user.email,
      Image: "",
      createdAt: Timestamp.fromDate(new Date()),
      read: false,
    };

    if (img) {
      uploadFileToStorage(img)
        .then((downloadURL) => {
          data.photoUrl = downloadURL;
          addMessage(data, id);
          setLastMessage(data, id);
          setText("");
          setImage("");
        })
        .catch((err) => {
          console.log(err.message);
        });
    } else {
      addMessage(data, id);
      setLastMessage(data, id);
      setText("");
      setImage("");
    }
  };

  const removeImage = () => {
    setImage("");
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  useEffect(() => {
    getSpecificChat(id, setMessages);
    seenMesaage(id);
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={"light-content"} backgroundColor={COLORS.primary} />
      <View style={styles.topContainer}>
        <TopComp
          chat={true}
          text={user.username.toUpperCase()}
          navigation={navigation}
          extratTextStyle={{ fontSize: 16 }}
        />
      </View>

      <ScrollView contentContainerStyle={styles.chatsWrapper}>
        <Messages data={messages} />
      </ScrollView>

      {image ? (
        <Footer
          text={text}
          pickImage={pickImage}
          setText={setText}
          sendText={sendText}
          image={image}
          imgsendStyle={styles.ImageSendFooterStyle}
        />
      ) : (
        <Footer
          text={text}
          pickImage={pickImage}
          setText={setText}
          sendText={sendText}
          image={image}
        />
      )}

      {image ? <MediaComp image={image} removeImage={removeImage} /> : null}
    </SafeAreaView>
  );
};

export default Chat;

const Footer = ({
  text,
  pickImage,
  setText,
  sendText,
  image,
  imgsendStyle,
}) => (
  <View style={[styles.footer, image && imgsendStyle]}>
    <TouchableOpacity onPress={pickImage}>
      <ImageIcon name="image" size={20} />
    </TouchableOpacity>
    <View style={styles.inputWrapper}>
      <Input
        placeholder="type message"
        setValue={setText}
        extraStyle={styles.extraInputStyle}
        chatting={true}
        textvalue={text}
        multiline
      />
    </View>
    <TouchableOpacity onPress={() => sendText(image)}>
      <SendIcon name="send" size={25} color={COLORS.primary} />
    </TouchableOpacity>
  </View>
);

const MediaComp = ({ image, removeImage }) => (
  <View style={styles.mediaCompStyle}>
    <TouchableOpacity style={styles.closeIconWrapper} onPress={removeImage}>
      <CloseIcon name="delete" size={30} color="red" />
    </TouchableOpacity>
    <Image source={{ uri: image }} style={styles.mediaImage} />
  </View>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
  },

  topContainer: {
    width: "100%",
    height: "8%",
  },

  chatsWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  footer: {
    width: "100%",
    minHeight: "10%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderTopColor: COLORS.primary,
    borderTopWidth: 1,
  },
  inputWrapper: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 5,
  },

  mediaCompStyle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "65%",
    backgroundColor: COLORS.darkGray,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  mediaImage: {
    width: "100%",
    height: "87%",
    borderRadius: 10,
  },
  closeIconWrapper: {
    position: "absolute",
    top: 5,
    right: 10,
    zIndex: 999,
  },

  ImageSendFooterStyle: {
    position: "absolute",
    width: "100%",
    minHeight: "10%",
    bottom: 0,
    left: 0,
    zIndex: 2000,
    backgroundColor: COLORS.white,
    flexDirection: "row",
    alignItems: "center",
  },
  extraInputStyle: {
    borderWidth: 0,
    maxWidth: "90%",
    minHeight: 60,
    paddingVertical: 10,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 20,
  },
});
