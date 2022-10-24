import { Alert, Image, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./pageStyles/signinStyles";
import { db } from "../../firebase/firebase.config";
import { collection, setDoc, doc } from "firebase/firestore";
import { AccountTextComp, ButtonComp, Input } from "../components/Reuse";
import { fbUserRegister } from "../../firebase/firebaseAuth/firebaseAuth";

const Signin = ({ navigation }) => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  const gotoLoginPage = () => {
    navigation.navigate("login");
  };

  const signIn = async () => {
    const gmail = "@gmail.com";

    const collectionRef = collection(db, "users");

    if (!email || !username || !password) {
      setSigningIn(false);
      return alert("please fill all the inputs");
    }
    if (email.length < 6 || password.length < 6) {
      setSigningIn(false);
      return alert("email and password must be 6 character long!");
    }

    if (!email.includes(gmail)) {
      return Alert.alert("PLEASE PUT A GMAIL WITH @gmail WORD INCLUDED!");
    }
    setSigningIn(true);

    fbUserRegister(email, password)
      .then((res) => {
        setDoc(doc(collectionRef, res.user.uid), {
          username,
          email,
          uid: res.user.uid,
        });
        navigation.navigate("home");
        console.log("all okay");
      })
      .catch((err) => {
        setSigningIn(false);
        Alert.alert(err.message);
      });
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.mainContentWrapper}>
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/logo.png")}
            style={styles.logoStyle}
          />
        </View>
        <Input
          placeholder="Username"
          setValue={setUserName}
          textvalue={username}
        />
        <Input placeholder="Email" setValue={setEmail} textvalue={email} />
        <Input
          placeholder="Password"
          setValue={setPassword}
          textvalue={password}
          secure={true}
          secureTextEntry
        />
        <ButtonComp
          text={signingIn == false ? "SignIn" : "SigningIn..."}
          btnClick={signIn}
        />
        <AccountTextComp
          text="Already have an account?"
          linkText="Login here!"
          click={gotoLoginPage}
        />
      </View>
    </SafeAreaView>
  );
};

export default Signin;
