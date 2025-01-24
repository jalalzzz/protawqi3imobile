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
  },
  img: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  imgPen: {
    resizeMode: "contain",
    marginHorizontal: 25,
    resizeMode: "contain",
  },
  underHeader: {
    fontSize:
      width < 700 ? Constants.fontSize.Medium : Constants.fontSize.XLarge,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#00000099",
    marginBottom: "10%",
    width: "80%",
    textAlign: "center",
  },
});
