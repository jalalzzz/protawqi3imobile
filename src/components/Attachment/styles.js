import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor:"#F8F8F8"
  },
  attachment: {
    width: "90%",
    // height: "50%",
    padding: 15,
    marginTop: "3%",
    alignSelf: "center",
    backgroundColor: "white",
  },
});
