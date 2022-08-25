import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	ScrollView,
	Pressable,
	Image,
	TouchableOpacity,
} from "react-native";
import React, {useEffect, useState} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {Input, TopComp} from "../components/Reuse";
import {COLORS} from "../Color/Coolor";
import ImageIcon from "react-native-vector-icons/Feather";
import CloseIcon from "react-native-vector-icons/Feather";
import SendIcon from "react-native-vector-icons/Ionicons";
import {auth, db, storage} from "../../firebase/firebase.config";
import * as ImagePicker from "expo-image-picker";

import {
	addDoc,
	collection,
	doc,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import Messages from "../components/Messages";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scrollview";

const Chat = ({navigation, route}) => {
	const user = route.params;
	const [text, setText] = useState("");
	const [messages, setMessages] = useState([]);
	const [image, setImage] = useState(null);
	const [downloadError, setDownloadError] = useState("");

	const userMe = auth.currentUser;
	const id =
		userMe.uid > user?.uid
			? `${userMe.uid + user?.uid}`
			: `${user?.uid + userMe.uid}`;

	const extraStyle = {
		borderWidth: 0,
		maxWidth: "90%",
		minHeight: 60,
		paddingVertical: 10,
		fontSize: 15,
		fontWeight: "600",
		lineHeight: 20,
	};

	const sendText = async (img) => {
		if (img) {
			const imgFile = await (await fetch(img)).blob();
			const imagesRef = ref(storage, `images/${imgFile._data.name}`);
			const uploadTask = uploadBytesResumable(imagesRef, imgFile);

			return uploadTask.on(
				"state_changed",
				(snapshot) => {},
				(error) => {
					setDownloadError(error);
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							addDoc(collection(db, "messages", id, "chat"), {
								text: text || null,
								photoUrl: downloadURL,
								from: userMe.email,
								to: user.email,
								Image: "",
								createdAt: Timestamp.fromDate(new Date()),
								read: false,
							});
							setDoc(doc(db, "lastMsg", id), {
								text: text || null,
								photoUrl: downloadURL,
								from: userMe.email,
								to: user.email,
								createdAt: Timestamp.fromDate(new Date()),
								Image: "",
								read: false,
							});
							setText("");
							setImage("");
						}
					);
				}
			);
		} else {
			await addDoc(collection(db, "messages", id, "chat"), {
				text: text || null,
				Image: "",
				photoUrl: "",
				from: userMe.email,
				to: user.email,
				createdAt: Timestamp.fromDate(new Date()),
				read: false,
			});

			setDoc(doc(db, "lastMsg", id), {
				text: text || null,
				photoUrl: "",
				from: userMe.email,
				to: user.email,
				createdAt: Timestamp.fromDate(new Date()),
				Image: "",
				read: false,
			});
			setText("");
			setImage("");
		}
	};

	const removeImage = () => {
		setImage("");
	};

	const pickImage = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	useEffect(() => {
		const msgsRef = collection(db, "messages", id, "chat");
		const q = query(msgsRef, orderBy("createdAt", "asc"));
		onSnapshot(q, (querySnapshot) => {
			let msgs = [];
			querySnapshot.forEach((doc) => {
				msgs.push(doc.data());
			});
			setMessages(msgs);
		});

		const seenMesaage = async () => {
			await updateDoc(doc(db, "lastMsg", id), {
				read: true,
			});
		};

		seenMesaage();
	}, []);

	return (
		<SafeAreaView style={styles.root}>
			<StatusBar barStyle={"light-content"} />
			<TopComp
				chat={true}
				text={user.username.toUpperCase()}
				navigation={navigation}
			/>

			<ScrollView contentContainerStyle={styles.chatsWrapper}>
				<Messages data={messages} />
			</ScrollView>

			{image ? (
				<Footer
					text={text}
					pickImage={pickImage}
					setText={setText}
					sendText={sendText}
					image={image}
					extraStyle={extraStyle}
					imgsendStyle={styles.ImageSendFooterStyle}
				/>
			) : (
				<Footer
					text={text}
					pickImage={pickImage}
					setText={setText}
					sendText={sendText}
					image={image}
					extraStyle={extraStyle}
				/>
			)}

			{image ? (
				<MediaComp image={image} removeImage={removeImage} />
			) : null}
		</SafeAreaView>
	);
};

export default Chat;

const Footer = ({
	text,
	pickImage,
	setText,
	sendText,
	image,
	extraStyle,
	imgsendStyle,
}) => (
	<View style={[styles.footer, image && imgsendStyle]}>
		<TouchableOpacity onPress={pickImage}>
			<ImageIcon name="image" size={20} />
		</TouchableOpacity>
		<View style={styles.inputWrapper}>
			<Input
				placeholder="type message"
				setValue={setText}
				extraStyle={extraStyle}
				chatting={true}
				textvalue={text}
			/>
		</View>
		<TouchableOpacity onPress={() => sendText(image)}>
			<SendIcon name="send" size={25} color={COLORS.primary} />
		</TouchableOpacity>
	</View>
);

const MediaComp = ({image, removeImage}) => (
	<View style={styles.mediaCompStyle}>
		<TouchableOpacity style={styles.closeIconWrapper} onPress={removeImage}>
			<CloseIcon name="delete" size={30} color="red" />
		</TouchableOpacity>
		<Image source={{uri: image}} style={styles.mediaImage} />
	</View>
);

const styles = StyleSheet.create({
	root: {
		flex: 1,
		height: "100%",
	},

	chatsWrapper: {
		flex: 1,
		backgroundColor: COLORS.white,
	},
	footer: {
		width: "100%",
		minHeight: "10%",
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		borderTopColor: COLORS.primary,
		borderTopWidth: 1,
	},
	inputWrapper: {
		flex: 1,
		marginTop: 5,
		paddingHorizontal: 5,
	},

	mediaCompStyle: {
		position: "absolute",
		bottom: 0,
		left: 0,
		width: "100%",
		height: "65%",
		backgroundColor: COLORS.darkGray,
		padding: 10,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
	},
	mediaImage: {
		width: "100%",
		height: "87%",
		borderRadius: 10,
	},
	closeIconWrapper: {
		position: "absolute",
		top: 5,
		right: 10,
		zIndex: 999,
	},

	ImageSendFooterStyle: {
		position: "absolute",
		width: "100%",
		minHeight: "10%",
		bottom: 0,
		left: 0,
		zIndex: 2000,
		backgroundColor: COLORS.white,
		flexDirection: "row",
		alignItems: "center",
	},
});
