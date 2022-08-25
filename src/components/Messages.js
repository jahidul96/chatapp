import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import React, {useRef} from "react";
import {COLORS} from "../Color/Coolor";
import {auth} from "../../firebase/firebase.config";

const Messages = ({data}) => {
	const userMe = auth.currentUser.email;
	const scrollViewRef = useRef();

	return (
		<ScrollView
			contentContainerStyle={styles.root}
			ref={scrollViewRef}
			onContentSizeChange={() =>
				scrollViewRef.current.scrollToEnd({animated: true})
			}
		>
			{data.map((msg, i) => (
				<View style={styles.msgWrapper} key={i}>
					{msg.photoUrl ? (
						<View
							style={[
								styles.photoWrapper,
								msg.from === userMe
									? styles.fromMephotoWrapper
									: styles.fromFriendphotoWrapper,
							]}
						>
							<Image
								source={{uri: msg.photoUrl}}
								style={styles.photo}
							/>
						</View>
					) : null}

					{msg?.text ? (
						<Text
							style={[
								styles.textWrapper,
								msg.from === userMe
									? styles.fromMeStyle
									: styles.fromFriend,
							]}
						>
							{msg.text}
						</Text>
					) : null}
				</View>
			))}
		</ScrollView>
	);
};

export default Messages;

const styles = StyleSheet.create({
	root: {
		padding: 10,
	},
	msgWrapper: {
		marginBottom: 5,
	},
	textWrapper: {
		paddingVertical: 7,
		maxWidth: "80%",
		paddingHorizontal: 12,
		minWidth: 30,
		borderRadius: 10,
		fontWeight: "400",
	},
	fromMeStyle: {
		alignSelf: "flex-end",
		backgroundColor: COLORS.lBlue,
		color: COLORS.white,
		fontWeight: "500",
	},
	fromFriend: {
		alignSelf: "flex-start",
		backgroundColor: COLORS.primary,
		color: COLORS.white,
	},
	photoWrapper: {
		width: "80%",
		height: 240,
		backgroundColor: COLORS.white,
		elevation: 4,
		marginVertical: 5,
		padding: 7,
		borderRadius: 10,
	},
	fromMephotoWrapper: {
		alignSelf: "flex-end",
	},
	fromFriendphotoWrapper: {
		alignSelf: "flex-start",
	},
	photo: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		borderWidth: 2,
		borderColor: COLORS.primary,
	},
});
