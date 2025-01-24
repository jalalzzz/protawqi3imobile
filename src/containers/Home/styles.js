import { Constants } from "@common";
import { StyleSheet, Dimensions ,Platform} from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  txt: {
    marginTop: "2%",
    color: "#00000099",
    fontSize: width < 700 ? 17 : 25,
    width: "90%",
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    marginBottom: -10,
    textAlign:Platform.OS=='ios'? 'left':'right'
  },
  pdf: {
    width: "90%",
    backgroundColor: "white",
    marginTop: "3%",
    alignSelf: "center",
    padding: 5,
    paddingBottom: 15,
  },
  search: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
 

  },
  content: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#F8F8F8",
    height: "100%",
  },
  txtInput: {
    width: "90%",
    height: 50,
    borderWidth: 1,
    marginTop: "5%",
    borderColor: "white",
    backgroundColor: "white",
    alignSelf: "center",
    paddingHorizontal: 45,
    fontSize: width < 700 ? 14 : 22,
    fontFamily: "DINNextLTArabic-Regular",
    textAlign:'right',
    color: "#00000033",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    
    elevation: 9,
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rowContent: { flex: 1, flexDirection: "row" },
  imgView: { width: "25%", height: "100%" },
  img: {
    width: "90%",
    height: "90%",
    resizeMode: "contain",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 8,
    marginBottom: 8,
  },
  information: { height: "100%" },
  icon: {
    width: "20%",
    height: "50%",
    paddingLeft: 20,
    alignSelf: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
});
