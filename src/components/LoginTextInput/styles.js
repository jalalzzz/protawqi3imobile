import { Constants } from "@common";
import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  rowInput:{flexDirection:"row",marginLeft:20},
  icon:{position:"absolute",right:0,marginTop:12,marginRight:30,zIndex:1},
  txtInput:{
    height: 50,
    width: width - 40,
    borderRadius: 0,
    paddingHorizontal: 8,
    backgroundColor:"#fff",
    alignSelf:"center"
  },
});
