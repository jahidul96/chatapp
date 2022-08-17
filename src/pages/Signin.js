import {View} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./pageStyles/signinStyles";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../firebase/firebase.config";
import {collection, setDoc, doc} from "firebase/firestore";
import {AccountTextComp, ButtonComp, Input} from "../components/Reuse";

const Signin = ({navigation}) => {
	const [username, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState("");

	const gotoLoginPage = () => {
		navigation.navigate("login");
	};

	const signIn = async () => {
		const collectionRef = collection(db, "users");

		if (!email || !username || !password) {
			return alert("please fill all the inputs");
		}
		if (email.length < 6 || password.length < 6) {
			return alert("email and password must be 6 character long!");
		}
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			setDoc(doc(collectionRef, result.user.uid), {
				username,
				email,
				uid: result.user.uid,
			});
			navigation.navigate("home");
			console.log("all okay");
		} catch (err) {
			alert(err.message);
		}
	};

	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.mainContentWrapper}>
				<Input placeholder="Username" setValue={setUserName} />
				<Input placeholder="Email" setValue={setEmail} />
				<Input placeholder="Password" setValue={setPassword} />
				<ButtonComp text="Signin" btnClick={signIn} />
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
