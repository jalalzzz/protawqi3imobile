import { Constants } from "@common";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  container: { height: 99, backgroundColor: "#0877D0" },
  rightIcon: {
    flexDirection:Platform.OS=='ios'?"row-reverse": "row",
    justifyContent: "space-around",
    marginTop: 50,
    marginHorizontal: 15,
  },
  img: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginTop: 0,
  },
  logo: { position: "absolute", right: 0, marginRight: 20 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: 300,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    alignSelf: "flex-start",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 17,
    color: "#0877D0",
    fontFamily: "DINNextLTArabic-Regular",
  },
  txtLang: {
    margin: 6,
    fontSize: 15,
    fontFamily: "DINNextLTArabic-Regular",
  },
});
