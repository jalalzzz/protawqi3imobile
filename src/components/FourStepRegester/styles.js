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
  imgFinger: {
    width: 60,
    height: 60,
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
    textAlign: "center",
  },
  underHeader: {
    fontSize:
      width < 700 ? Constants.fontSize.Large : Constants.fontSize.Medium,
    alignSelf: "center",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#00000099",
    width: "80%",
    textAlign: "center",
  },
  finger: {
    alignSelf: "center",
    marginTop: "10%",
  },
  c1: {
    height: 130,
    width: 130,
    borderRadius: 1000,
    borderWidth: 2,
    alignSelf: "center",
    borderColor: "#6ac2e2",
    //opacity: 0.2,
    marginTop: "15%",
  },
  c2: {
    height: 110,
    width: 110,
    borderRadius: 110,
    borderWidth: 1.5,
    alignSelf: "center",
    borderColor: "#3fb0d9",
    opacity: 0.8,
    justifyContent: "center",
    marginTop: "7%",
  },
  c3: {
    height: 90,
    width: 90,
    borderRadius: 100,
    borderWidth: 3,
    alignSelf: "center",
    borderColor: "#0877D0",
    //justifyContent: "center",
    // marginTop: "10%",
  },
  txtBtm: {
    alignSelf: "center",
    textAlign: "center",
    color: "#0877d0",
    width: "60%",
    marginTop: "10%",
    fontSize:
      width < 700 ? Constants.fontSize.Large : Constants.fontSize.Medium,
    fontFamily: "DINNextLTArabic-Regular",
  },
});
