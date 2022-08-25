import {
	Pressable,
	StyleSheet,
	Text,
	View,
	StatusBar,
	ScrollView,
} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../Color/Coolor";
import {TopComp} from "../components/Reuse";
import ChatUser from "../components/ChatUser";

import {collection, query, where, onSnapshot} from "firebase/firestore";
import {auth, db} from "../../firebase/firebase.config";
import UserProfile from "../components/UserProfile";

const Home = () => {
	const [allusers, setAllusers] = useState([]);
	const [showprofile, setShowProfile] = useState(false);
	const [myInfo, setMyInfo] = useState();

	const thisUser = auth.currentUser.uid;
	const usersRef = collection(db, "users");

	useEffect(() => {
		const q = query(usersRef, where("uid", "not-in", [thisUser]));

		const sq = query(usersRef, where("uid", "in", [thisUser]));
		onSnapshot(q, (querySnapshot) => {
			let users = [];
			querySnapshot.forEach((doc) => {
				users.push(doc.data());
			});

			setAllusers(users);
		});

		onSnapshot(sq, (querySnapshot) => {
			let mydata = {};
			querySnapshot.forEach((doc) => {
				// console.log(doc.data());
				mydata = doc.data();
			});
			setMyInfo(mydata);
		});
	}, []);

	return (
		<SafeAreaView style={styles.root}>
			<StatusBar barStyle={"light-content"} />
			<TopComp
				text="Chats"
				setShowProfile={setShowProfile}
				showprofile={showprofile}
			/>
			{showprofile && <UserProfile myInfo={myInfo} />}
			<ScrollView contentContainerStyle={styles.userWrapper}>
				{allusers.length ? (
					allusers.map((data) => (
						<ChatUser data={data} key={data.uid} />
					))
				) : (
					<View style={styles.noUserFoundStyle}>
						<Text style={styles.nouserText}>No User Found</Text>
					</View>
				)}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		height: "100%",
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
