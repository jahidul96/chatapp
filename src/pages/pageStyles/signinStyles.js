import { StyleSheet } from "react-native";
import { COLORS } from "../../Color/Coolor";

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  mainContentWrapper: {
    width: "100%",
  },
  logoWrapper: {
    alignItems: "center",
    height: 80,
    marginBottom: 15,
  },
  logoStyle: {
    height: "100%",
  },
});
