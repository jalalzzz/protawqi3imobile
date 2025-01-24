import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  txtHeader: {
    fontSize:
      width < 700 ? Constants.fontSize.XLarge : Constants.fontSize.XXLarege,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#0778D0",
    marginTop: "5%",
    fontWeight: "bold",
  },
  img: {
    height: 100,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 40,
  },
  underHeader: {
    fontSize:
      width < 700 ? Constants.fontSize.Medium : Constants.fontSize.XLarge,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#00000099",
    marginTop: 25,
    width: "80%",
    textAlign: "center",
  },
  underHeaderPlus: {
    fontSize:
      width < 700 ? Constants.fontSize.Medium : Constants.fontSize.Medium,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#00000099",
    marginTop: "0%",
    width: "80%",
    textAlign: "center",
  },
  underOtp: {
    fontSize:
      width < 700 ? Constants.fontSize.Large : Constants.fontSize.Medium,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#00000099",
    marginTop: 39,
    width: "63%",
    textAlign: "center",
  },
  underOtpBlue: {
    fontSize:
      width < 700 ? Constants.fontSize.Large : Constants.fontSize.Medium,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",

    textDecorationLine: "underline",
    color: "blue",
    marginTop: "1%",
    width: "85%",
    textAlign: "center",
  },
});
