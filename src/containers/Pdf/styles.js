import { Constants } from "@common";
import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");
export default StyleSheet.create({
  pdf: {
    width: Dimensions.get("window").width > 600 ? "95%" : "116%",
    height: Dimensions.get("window").width > 600 ? 50 : 50,
    alignSelf: "center",
    paddingHorizontal: Dimensions.get("window").width > 600 ? 0 : 75,
    marginTop: Dimensions.get("window").width > 600 ? 30 : 20,
    zIndex: 0,
  },
  centeredView: {
    flex: 1,
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    marginTop: "20%",
  },
  modalView: {
    margin: 20,
    width: "60%",
    alignSelf: "center",
    backgroundColor: "#EFEFF4",
    borderRadius: 20,
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
  txtModal: {
    fontSize: 20,
    color: "#00000099",
    fontFamily: "DINNextLTArabic-Regular",
    paddingTop: "10%",
  },
  txtQustion: {
    fontSize: 17,
    color: "#00000099",
    width: "65%",
    fontFamily: "DINNextLTArabic-Regular",
    textAlign: "center",
    marginTop: "5%",
  },
  reason: {
    fontSize: 17,
    color: "#00000099",
    width: "100%",
    fontFamily: "DINNextLTArabic-Regular",
    marginTop: "5%",
    alignSelf: "flex-start",
    paddingHorizontal: "10%",
    textAlign: Platform.OS == "android" ? "auto" : "left",
  },
  input: {
    marginTop: "5%",
    borderRadius: 0,
    borderWidth: 1,
    width: Dimensions.get("window").width * 0.75,
    height: "30%",
    backgroundColor: "white",
    textAlign: Platform.OS == "android" ? "auto" : "right",
  },
  touch: {
    width: "50%",
    margin: "1%",
    padding: 15,
    alignSelf: "center",
  },
  showAttach: {
    marginBottom: "2%",
    marginLeft: "3%",
    fontFamily: "DINNextLTArabic-Regular",
    color: "#909090",
    fontSize: 16,
  },
  touchReject: {
    width: "50%",
    backgroundColor: "white",
    marginRight: "0.5%",
  },
  touchRejectFull: {
    width: "100%",
    //backgroundColor: "white",
    marginRight: "0.5%",
  },
  reject: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#F8F8F8",
  },
  sign: {
    textAlign: "center",
    fontSize: 17,
    fontFamily: "DINNextLTArabic-Regular",
    color: "#F8F8F8",
  },
  containerMain: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  bottomView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", //Here is the trick
    bottom: 0, //Here is the trick
  },
  textStyle: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "DINNextLTArabic-Regular",
  },
  verticleLine: {
    width: 2,
    backgroundColor: "#909090",
    height: "190%",
    alignSelf: "center",
  },
  attachmentHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  notesBtn: {
    backgroundColor: "#0877D0",
    padding: 5,
    borderRadius: 12,
    marginBottom: 7,
  },

  popupHeder: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignItems: "center",
    marginTop: 10,
  },
  closeBtn: {
    backgroundColor: "#0877D0",
    borderRadius: 25,
    alignSelf: "flex-end",
    padding: 2,
  },
});
