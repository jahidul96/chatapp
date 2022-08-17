import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React from "react";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../Color/Coolor";

const ChatUser = () => {
	const navigation = useNavigation();

	const startChat = () => {
		navigation.navigate("chat");
	};
	return (
		<TouchableOpacity
			style={styles.signleUserWrapper}
			activeOpacity={0.7}
			onPress={startChat}
		>
			<Image
				source={{
					uri: "http://arunoommen.com/wp-content/uploads/2017/01/man-2_icon-icons.com_55041.png",
				}}
				style={styles.imgStyle}
			/>
			<View style={styles.userChatDetailsWrapper}>
				<View style={[styles.flexStyle, styles.nameWrapper]}>
					<Text style={styles.name}>jahidul islam</Text>
					<View style={styles.notifyStyle}>
						<Text style={styles.notifyText}>3</Text>
					</View>
				</View>
				<View style={styles.flexStyle}>
					<Text style={styles.msg}>message</Text>
					<Text style={styles.msg}>11:2 AM</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ChatUser;

const styles = StyleSheet.create({
	signleUserWrapper: {
		width: "100%",
		height: "10%",
		paddingHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	imgStyle: {
		width: 50,
		height: 50,
		borderRadius: 100 / 2,
	},
	userChatDetailsWrapper: {
		flex: 1,
		paddingHorizontal: 8,
		height: "85%",
		justifyContent: "center",
		borderBottomColor: COLORS.gray,
		borderBottomWidth: 1,
	},
	flexStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	nameWrapper: {
		marginBottom: 4,
	},
	name: {
		fontWeight: "700",
		fontSize: 15,
	},
	msg: {
		color: COLORS.darkGray,
		fontSize: 12,
	},
	notifyStyle: {
		width: 16,
		height: 16,
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "red",
	},
	notifyText: {
		fontSize: 9,
		color: COLORS.white,
	},
});
