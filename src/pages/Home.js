import {
	Pressable,
	StyleSheet,
	Text,
	View,
	StatusBar,
	ScrollView,
} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {COLORS} from "../Color/Coolor";
import {TopComp} from "../components/Reuse";
import ChatUser from "../components/ChatUser";

const user = [1, 2, 3, 4, 5, 6, 7];

const Home = () => {
	return (
		<SafeAreaView style={styles.root}>
			<StatusBar barStyle={"light-content"} />
			<TopComp text="Chats" />
			<ScrollView contentContainerStyle={styles.userWrapper}>
				{user.map((data) => (
					<ChatUser />
				))}
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
});
