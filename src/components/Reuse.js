import {TextInput, View, StyleSheet, Pressable, Text} from "react-native";
import {COLORS} from "../Color/Coolor";
import MenuIcon from "react-native-vector-icons/Feather";
import SearchIcon from "react-native-vector-icons/Feather";
import ArrowLeft from "react-native-vector-icons/Feather";

export const Input = ({placeholder, setValue, extraStyle}) => (
	<TextInput
		placeholder={placeholder}
		style={[styles.inputStyle, extraStyle]}
		onChangeText={(text) => setValue(text)}
	/>
);

export const ButtonComp = ({text, btnClick}) => (
	<Pressable style={styles.buttonCompStyle} onPress={btnClick}>
		<Text>{text}</Text>
	</Pressable>
);

export const AccountTextComp = ({linkText, text, click}) => (
	<View style={styles.accountTextCompStyle}>
		<Text>{text}</Text>
		<Pressable onPress={click}>
			<Text style={styles.linkText}>{linkText}</Text>
		</Pressable>
	</View>
);

export const TopComp = ({text, chat, navigation}) => (
	<View style={styles.topcontentWrapper}>
		<View style={styles.leftContentWrapper}>
			{chat ? (
				<Pressable onPress={() => navigation.navigate("home")}>
					<ArrowLeft
						name="chevron-left"
						size={22}
						color={COLORS.white}
					/>
				</Pressable>
			) : (
				<MenuIcon name="menu" size={20} color={COLORS.white} />
			)}
			<Text style={styles.text}>{text}</Text>
		</View>
		{!chat && (
			<Pressable>
				<SearchIcon name="search" size={20} color={COLORS.white} />
			</Pressable>
		)}
	</View>
);

const styles = StyleSheet.create({
	// inputStyle
	inputStyle: {
		height: 35,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: COLORS.primary,
		marginBottom: 8,
	},

	// buttonCompStyle
	buttonCompStyle: {
		width: "100%",
		height: 35,
		backgroundColor: COLORS.primary,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},

	// accountTextCompStyle
	accountTextCompStyle: {
		justifyContent: "center",
		alignItems: "center",
		marginTop: 5,
	},
	linkText: {
		marginTop: 4,
		color: COLORS.primary,
	},

	// topComp styles

	topcontentWrapper: {
		width: "100%",
		height: "9%",
		backgroundColor: COLORS.primary,
		paddingHorizontal: 15,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	leftContentWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	text: {
		marginLeft: 15,
		fontSize: 18,
		fontWeight: "700",
		color: COLORS.white,
	},
});
