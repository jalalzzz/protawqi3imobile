import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  img: {
    width: "60%",
    height: "20%",
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: width > 600 ? "5%" : "3.5%",
  },
  txtHeader: {
    fontSize: 19,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",

    color: "#ffff",
  },
  contentLogin: {
    width: "90%",
    height: "60%",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: "10%",
    borderRadius: 12,
  },
  txtContent: {
    marginTop: "7%",
    marginHorizontal: "10%",
    fontSize: 20,
    fontFamily: "DINNextLTArabic-Regular",

    color: "#0877D0",
  },
  txtSilver: {
    marginTop: "10%",
    marginHorizontal: "2%",
    fontSize: width > 600 ? 25 : 20,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#999999",
    alignSelf: "center",
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
  txtInput: {
    marginTop: 10,
    marginHorizontal: "10%",
    fontSize: 15,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#0877D0",
  },
  input: {
    marginHorizontal: "10%",
    marginTop: "5%",
    width: "80%",
    height: "13%",
    borderColor: "#00000033",
    borderWidth: 1,
    zIndex: 100,
    paddingHorizontal: 10,
  },
  btn: {
    marginTop: "15%",
    marginHorizontal: "10%",
    width: "80%",
  },
  txtID: { color: "#0877d0", textDecorationLine: "underline" },
});
