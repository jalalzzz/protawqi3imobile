import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    backgroundColor: "#d9d9d9",
    zIndex: 1000,
  },
});
