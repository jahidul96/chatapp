import {
	TextInput,
	View,
	StyleSheet,
	Pressable,
	Text,
	TouchableOpacity,
} from "react-native";
import {COLORS} from "../Color/Coolor";
import MenuIcon from "react-native-vector-icons/Feather";
import SearchIcon from "react-native-vector-icons/Feather";
import ArrowLeft from "react-native-vector-icons/Feather";

export const Input = ({
	placeholder,
	setValue,
	extraStyle,
	textvalue,
	secure,
}) => (
	<TextInput
		placeholder={placeholder}
		style={[styles.inputStyle, extraStyle]}
		onChangeText={(text) => setValue(text)}
		value={textvalue}
		multiline
		secureTextEntry={secure && true}
		autoCapitalize="none"
	/>
);

export const ButtonComp = ({text, btnClick}) => (
	<TouchableOpacity
		style={styles.buttonCompStyle}
		onPress={btnClick}
		activeOpacity={0.7}
	>
		<Text style={styles.btntext}>{text}</Text>
	</TouchableOpacity>
);

export const AccountTextComp = ({linkText, text, click}) => (
	<View style={styles.accountTextCompStyle}>
		<Text>{text}</Text>
		<Pressable onPress={click}>
			<Text style={styles.linkText}>{linkText}</Text>
		</Pressable>
	</View>
);

export const TopComp = ({
	text,
	chat,
	navigation,
	setShowProfile,
	showprofile,
}) => (
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
				<Pressable onPress={() => setShowProfile(!showprofile)}>
					<MenuIcon name="menu" size={20} color={COLORS.white} />
				</Pressable>
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
		height: 40,
		paddingHorizontal: 10,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: COLORS.primary,
		marginBottom: 10,
	},

	// buttonCompStyle
	buttonCompStyle: {
		width: "100%",
		height: 40,
		backgroundColor: COLORS.primary,
		borderRadius: 5,
		justifyContent: "center",
		alignItems: "center",
	},
	btntext: {
		color: "#fff",
		fontWeight: "700",
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
