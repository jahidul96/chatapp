import {
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../Color/Coolor";
import MenuIcon from "react-native-vector-icons/Feather";
import SearchIcon from "react-native-vector-icons/Feather";
import ArrowLeft from "react-native-vector-icons/Feather";

export const Input = ({
  placeholder,
  setValue,
  extraStyle,
  textvalue,
  multiline,
  secure,
  secureTextEntry,
}) => (
  <TextInput
    placeholder={placeholder}
    style={[styles.inputStyle, extraStyle]}
    onChangeText={(text) => setValue(text)}
    value={textvalue}
    multiline={multiline}
    secureTextEntry={secureTextEntry}
  />
);

export const ButtonComp = ({ text, btnClick }) => (
  <TouchableOpacity
    style={styles.buttonCompStyle}
    onPress={btnClick}
    activeOpacity={0.7}
  >
    <Text style={styles.btntext}>{text}</Text>
  </TouchableOpacity>
);

export const AccountTextComp = ({ linkText, text, click }) => (
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
  extratTextStyle,
}) => (
  <View style={styles.topcontentWrapper}>
    <View style={styles.leftContentWrapper}>
      {chat ? (
        <Pressable onPress={() => navigation.navigate("home")}>
          <ArrowLeft name="chevron-left" size={22} color={COLORS.white} />
        </Pressable>
      ) : (
        <Pressable onPress={() => setShowProfile(!showprofile)}>
          <MenuIcon name="menu" size={20} color={COLORS.white} />
        </Pressable>
      )}
      <Text style={[styles.text, extratTextStyle]}>{text}</Text>
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
    height: 50,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginBottom: 13,
    fontSize: 15,
  },

  // buttonCompStyle
  buttonCompStyle: {
    width: "100%",
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  btntext: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // accountTextCompStyle
  accountTextCompStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
  },
  linkText: {
    marginTop: 4,
    color: COLORS.primary,
    fontSize: 15,
  },

  // topComp styles

  topcontentWrapper: {
    width: "100%",
    height: "100%",
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
