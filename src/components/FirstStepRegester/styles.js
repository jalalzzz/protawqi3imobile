import { StyleSheet, Dimensions, Platform } from "react-native";
import { Color, Constants, Device } from "@common";
const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
  img: {
    height: width < 700 ? 90 : 120,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  txtIDFont: {
    color: "#0877d0",
    textAlign: "center",
  },
  txtID: {
    marginTop: 10,
    height: 50,
    paddingTop: 15,
    backgroundColor: "#fff",
    width: 120,
    alignSelf: "center",
    zIndex: 1,
    marginTop: width < 600 ? 10 : 10,
  },
  imgLogo: {
    width: "100%",
    marginTop: width < 700 ? 30 : 87,
    backgroundColor: "white",
  },
  txtHeader: {
    fontSize:
      width < 700 ? Constants.fontSize.Medium : Constants.fontSize.XLarge,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",

    fontWeight: "bold",
    color: "#ffff",
    marginTop: 24,
  },
  contentLogin: {
    width: width < 700 ? "80%" : "75%",
    backgroundColor: "white",
    alignSelf: "center",
    marginTop: width < 700 ? 50 : 100,
    borderRadius: 12,
    paddingBottom:Dimensions.get('window').width>700?40: 20,
  },
  txtContent: {
    marginTop: "5%",
    marginHorizontal: "10%",
    fontSize: width < 700 ? Constants.fontSize.XLarge : 30,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#0877D0",
    textAlign: Platform.OS == "ios" ? "left" : "auto",
  },
  txtSilver: {
    marginTop: "2%",
    marginHorizontal: "10%",
    fontSize: width < 700 ? Constants.fontSize.Small : 18,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#999999",
    textAlign: Platform.OS == "ios" ? "left" : "auto",
  },
  txtInput: {
    marginTop: 15,
    marginHorizontal: "10%",
    fontSize: width < 700 ? Constants.fontSize.Large : 22,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#0877D0",
    textAlign: Platform.OS == "ios" ? "left" : "auto",
  },
  input: {
    marginHorizontal: "10%",
    fontFamily: "DINNextLTArabic-Regular",
    marginTop: 5,
    width: "80%",
    height: "13%",
    fontSize: width < 700 ? 14 : 22,
    borderColor: "#00000033",
    borderWidth: 1,
    zIndex: 100,
    paddingHorizontal: 15,
    color: "black",
  },
  btn: {
    marginTop: 40,
    marginHorizontal: "10%",
    width: "80%",
  },
  linkContainer: {
    //color: "#0877d0" ,
    textDecorationLine: "underline",
    backgroundColor: "#00000000",
    textAlign: "center",
    marginTop: "20px",
    width: "100px",
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
});
