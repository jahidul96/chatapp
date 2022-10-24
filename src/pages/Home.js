import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../Color/Coolor";
import { TopComp } from "../components/Reuse";
import ChatUser from "../components/ChatUser";
import { auth } from "../../firebase/firebase.config";
import UserProfile from "../components/UserProfile";
import {
  AllChatMate,
  getCurrentUser,
} from "../../firebase/fireStore/FirestoreFb";
import Loadder from "../components/Loadder";

const Home = () => {
  const [showprofile, setShowProfile] = useState(false);
  const [myInfo, setMyInfo] = useState();
  const [loadding, setLoadding] = useState(true);
  const [fetchAllUser, setFecthAllUsers] = useState([]);

  const allusers = fetchAllUser.filter(
    (val) => val.uid != auth.currentUser.uid
  );

  //   console.log("fetchAllUser", fetchAllUser);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        // console.log(data);
        setMyInfo(data);
        AllChatMate(setFecthAllUsers);
        setTimeout(() => {
          setLoadding(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={"light-content"} backgroundColor={COLORS.primary} />
      {loadding ? (
        <Loadder />
      ) : (
        <>
          <View style={styles.topContainer}>
            <TopComp
              text="Chats"
              setShowProfile={setShowProfile}
              showprofile={showprofile}
            />
          </View>
          {showprofile && <UserProfile myInfo={myInfo} />}
          <ScrollView contentContainerStyle={styles.userWrapper}>
            {allusers?.length > 0 ? (
              allusers?.map((data) => <ChatUser data={data} key={data.uid} />)
            ) : (
              <View style={styles.noUserFoundStyle}>
                <Text style={styles.nouserText}>No User Found</Text>
              </View>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: "100%",
  },
  topContainer: {
    width: "100%",
    height: "9%",
  },

  userWrapper: {
    width: "100%",
    height: "100%",
  },
  noUserFoundStyle: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nouserText: {
    fontSize: 18,
    fontWeight: "700",
  },
});
