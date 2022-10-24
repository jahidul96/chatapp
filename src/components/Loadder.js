import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

const Loadder = () => {
  return (
    <View style={styles.root}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loadder;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
