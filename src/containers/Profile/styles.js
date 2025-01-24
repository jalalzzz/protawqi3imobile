import { StyleSheet, Dimensions, I18nManager } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: { height: 85, backgroundColor: "#0877D0" },
  rightIcon: {
    flexDirection: "row",
    justifyContent: "center",
    position: "relative",
    bottom: -60,
  },
  img: {
    width: width * 0.3,
    height: height * 0.2,
    resizeMode: "contain",
    marginTop: -10,
  },
  logo: { position: "absolute", right: 0, marginRight: 20 },
  text: {
    fontSize: 20,
    color: "white",
    marginTop: -20,
    fontFamily: "DINNextLTArabic-Regular",
  },
  profileData: { backgroundColor: "#EFEFF4", height: "100%" },
  containerData: {
    width: "85%",
    padding: 10,
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "2%",
  },
  label: {
    color: "#00000099",
    fontSize: width < 700 ? 12 : 16,
    fontFamily: "DINNextLTArabic-Regular",
    marginHorizontal: 10,
    textAlign: Platform.OS !== "ios" ? "right" : "left",
  },
  data: {
    color: "#00000099",
    fontFamily: "DINNextLTArabic-Regular",
    fontSize: width < 700 ? 12 : 16,
    marginTop: 15,
    marginHorizontal: 10,
  },
  sign: {
    width: 180,
    height: 150,
    resizeMode: "contain",
    alignSelf: "center",
    color: "black",
    marginRight: -20,
  },
});
