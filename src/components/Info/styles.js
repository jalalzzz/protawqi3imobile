import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";
import I18n from "@i18n";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: "100%",
    fontFamily: "DINNextLTArabic-Regular",
  },
  label: {
    color: "#00000099",
    marginHorizontal: "7%",
    marginTop: 20,
    fontSize: width > 600 ? 22 : 18,
    textAlign: Platform.OS == "ios" ? "left" : "auto",
    fontWeight: "bold",
    fontFamily: "DINNextLTArabic-Regular",
  },
  data: {
    fontSize: width > 600 ? 20 : 14,
    color: "#00000099",
    fontFamily: "DINNextLTArabic-Regular",
    marginHorizontal: "7%",
    marginTop: 3,
    textAlign: I18n.locale === "en-Us" ? "left" : "right",
    fontWeight: "200",
  },
});
