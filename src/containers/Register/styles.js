import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    flex: 1,
    height: height,
    opacity: 1,
  },
});
