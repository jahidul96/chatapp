import {View} from "react-native";
import React, {useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {styles} from "./pageStyles/signinStyles";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../firebase/firebase.config";
import {AccountTextComp, ButtonComp, Input} from "../components/Reuse";

const Login = ({navigation}) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const gotoSignPage = () => {
		navigation.navigate("signin");
	};

	const logIn = async () => {
		if (!email || !password) {
			return alert("please fill all the inputs");
		}
		if (email.length < 6 || password.length < 6) {
			return alert("please provide right creadential!");
		}
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log("login succesfull");
			navigation.navigate("home");
		} catch (err) {
			alert(err.message);
		}
	};
	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.mainContentWrapper}>
				<Input placeholder="Email" setValue={setEmail} />
				<Input placeholder="Password" setValue={setPassword} />
				<ButtonComp text="Login" btnClick={logIn} />
				<AccountTextComp
					text="Don't have an account?"
					linkText="Signin here!"
					click={gotoSignPage}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Login;
