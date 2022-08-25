import {
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, {useState} from "react";
import {COLORS} from "../Color/Coolor";
import Logout from "react-native-vector-icons/AntDesign";
import {signOut} from "firebase/auth";
import {auth} from "../../firebase/firebase.config";

const UserProfile = ({myInfo}) => {
	const [outing, setOuting] = useState(false);
	const logout = () => {
		setOuting(true);
		setTimeout(() => {
			signOut(auth);
		}, 2000);
	};
	return (
		<View style={styles.main}>
			<Text style={styles.username}>{myInfo.username}</Text>
			{outing == false ? (
				<TouchableOpacity style={styles.LogoutWrapper} onPress={logout}>
					<Logout name="logout" size={25} color="#fff" />
				</TouchableOpacity>
			) : (
				<View style={styles.loggingOutWrapper}>
					<Text style={styles.loggingoutText}>Logging out...</Text>
				</View>
			)}
		</View>
	);
};

export default UserProfile;

const styles = StyleSheet.create({
	main: {
		position: "absolute",
		width: "90%",
		height: "20%",
		top: "50%",
		alignSelf: "center",
		zIndex: 999,
		padding: 10,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: COLORS.gray,
		backgroundColor: COLORS.primary,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
	},
	username: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "700",
	},
	LogoutWrapper: {
		marginLeft: 10,
	},
	loggingOutWrapper: {
		width: 110,
		height: 30,
		backgroundColor: COLORS.white,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	loggingoutText: {
		fontWeight: "700",
		fontSize: 12,
	},
});
