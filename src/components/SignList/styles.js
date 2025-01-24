import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: "100%",
  },
  rowData: {
    flexDirection: "row",
    alignSelf: "flex-start",
    margin: "5%",
  },
  label: {
    color: "#70707066",
    fontSize: width > 600 ? 20 : 16,
    fontFamily: "DINNextLTArabic-Regular",
  },
  data: {
    color: "#0877D0",
    fontSize: width > 600 ? 20 : 16,
    fontFamily: "DINNextLTArabic-Regular",
  },
});
