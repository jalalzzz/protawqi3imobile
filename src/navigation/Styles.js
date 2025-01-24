import { StyleSheet, Dimensions } from "react-native";
import { Constants } from "@common";
export default StyleSheet.create({
  IphoneXView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  tabBar: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden",
    borderColor: "#e6e6e6",
    borderWidth: 2.5,
    borderBottomColor: "transparent",
    borderBottomWidth: 0.5,
    elevation: 0,
    zIndex: -999,
    width: "100%",
  },
  mainTab: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: "transparent",
    elevation: 0,
  },
  labelStyle: {
    fontFamily: "DINNextLTArabic-Regular",
  },
  authContainer: {
    //paddingTop: 15,
  },
  barStyle: {
    // borderWidth: 5,
    // borderBottomWidth: 1,
    // backgroundColor: "orange",
    // borderTopLeftRadius: 15,
    // borderTopRightRadius: 15,
    // borderColor: "transparent",
    // overflow: "hidden",
  },
});
