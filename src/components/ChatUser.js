import {Image, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {COLORS} from "../Color/Coolor";
import {auth, db} from "../../firebase/firebase.config";
import {doc, onSnapshot, updateDoc} from "firebase/firestore";
import ImageIcon from "react-native-vector-icons/Feather";
import CheckIcon from "react-native-vector-icons/Ionicons";

const ChatUser = ({data}) => {
	const navigation = useNavigation();

	const user2 = data?.uid;
	const currentUser = auth?.currentUser.email;
	const thisUser = auth?.currentUser?.uid;
	const [lastMsg, setLastMsg] = useState("");

	const startChat = (user) => {
		navigation.navigate("chat", user);
	};

	const converTime = (time) => {
		let hour = time.split(":")[0];
		let min = time.split(":")[1];
		let part = hour > 12 ? "pm" : "am";

		min = (min + "").length == 1 ? `0${min}` : min;
		hour = hour > 12 ? hour - 12 : hour;
		hour = (hour + "").length == 1 ? `0${hour}` : hour;

		return `${hour}:${min} ${part}`;
	};

	useEffect(() => {
		const id =
			thisUser > user2 ? `${thisUser + user2}` : `${user2 + thisUser}`;
		onSnapshot(doc(db, "lastMsg", id), (doc) => {
			setLastMsg(doc.data());
		});
	}, []);

	const msgTime = lastMsg?.createdAt?.toDate().toLocaleTimeString();

	return (
		<TouchableOpacity
			style={styles.signleUserWrapper}
			activeOpacity={0.7}
			onPress={() => startChat(data)}
		>
			<View style={styles.nameAvatorWrapper}>
				<Text style={styles.userAvator}>
					{data.username.length > 2 &&
						data.username.slice(0, 1).toUpperCase()}
				</Text>
			</View>
			<View style={styles.userChatDetailsWrapper}>
				<View style={[styles.flexStyle, styles.nameWrapper]}>
					<Text style={styles.name}>
						{data.username.toUpperCase()}
					</Text>
					{lastMsg?.read == false && lastMsg.from != currentUser && (
						<View style={styles.notifyStyle}>
							<Text style={styles.notifyText}>new</Text>
						</View>
					)}
				</View>
				{lastMsg ? (
					<View style={styles.flexStyle}>
						<View style={styles.flexStyle}>
							{lastMsg?.photoUrl ? (
								<ImageIcon
									name="image"
									size={12}
									style={{marginRight: 3}}
								/>
							) : null}
							<Text style={styles.msg}>
								{lastMsg?.text?.length >= 15
									? lastMsg?.text?.slice(0, 14) + "..."
									: lastMsg?.text}
							</Text>
						</View>
						<Text style={styles.msg}>
							{/* {msgTime.slice(0, 5)} */}
							{converTime(msgTime)}
						</Text>
					</View>
				) : null}
			</View>
		</TouchableOpacity>
	);
};

export default ChatUser;

const styles = StyleSheet.create({
	signleUserWrapper: {
		width: "100%",
		height: "12%",
		paddingHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
	},
	nameAvatorWrapper: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 5,
		borderRadius: 100 / 2,
		backgroundColor: COLORS.gray,
	},
	userAvator: {
		fontSize: 18,
		fontWeight: "700",
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
		fontSize: 13,
	},
	msg: {
		color: COLORS.darkGray,
		fontSize: 12,
	},
	notifyStyle: {
		width: 26,
		height: 16,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "red",
	},
	notifyText: {
		fontSize: 8,
		color: COLORS.white,
	},
});
