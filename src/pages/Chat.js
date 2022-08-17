import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	ScrollView,
	Pressable,
} from "react-native";
import React from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Input, TopComp} from "../components/Reuse";
import {COLORS} from "../Color/Coolor";
import ImageIcon from "react-native-vector-icons/Feather";
import SendIcon from "react-native-vector-icons/Ionicons";

const Chat = ({navigation}) => {
	const extraStyle = {
		borderWidth: 0,
	};
	return (
		<SafeAreaView style={styles.root}>
			<StatusBar barStyle={"light-content"} />
			<TopComp chat={true} text="Akash" navigation={navigation} />
			<ScrollView
				contentContainerStyle={styles.chatsWrapper}
			></ScrollView>
			<View style={styles.footer}>
				<Pressable>
					<ImageIcon name="image" size={20} />
				</Pressable>
				<View style={styles.inputWrapper}>
					<Input placeholder="type message" extraStyle={extraStyle} />
				</View>
				<Pressable>
					<SendIcon name="send" size={20} color={COLORS.primary} />
				</Pressable>
			</View>
		</SafeAreaView>
	);
};

export default Chat;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		height: "100%",
	},
	topcompWrapper: {
		width: "100",
		height: "9%",
	},
	chatsWrapper: {
		flex: 1,
	},
	footer: {
		width: "100%",
		height: "9%",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		borderTopColor: COLORS.gray,
		borderTopWidth: 1,
	},
	inputWrapper: {
		flex: 1,
		marginTop: 5,
		paddingHorizontal: 5,
	},
});
