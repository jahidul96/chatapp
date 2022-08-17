import {StyleSheet, Text, View} from "react-native";
import React from "react";

const Loading = () => {
	return (
		<View style={styles.root}>
			<Text>Loading...</Text>
		</View>
	);
};

export default Loading;

const styles = StyleSheet.create({
	root: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
