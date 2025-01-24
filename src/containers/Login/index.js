import { Config, Constants, Images } from "@common";
import styles from "./styles";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import I18n from "@i18n";
import TouchID from "react-native-touch-id";
import { Finger, MideumCircle, SmallCircle } from "@images";
import { connect } from "react-redux";
import AuthTokenStorage from "@store/AuthTokenStorage";
import { AppLoading, BottomLogo } from "@components";
import DeviceInfo from "react-native-device-info";
import KeyIcon from "../../../assets/icons/KeyIcon";
const Login = (props) => {
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    var id = DeviceInfo.getUniqueId();
    props.checkDeviceLink(id);
    props.resetLogin();
    //setFlag(false);
  }, []);
  useEffect(() => {
    if (props.isLogin == true) {
      props.getUserInfo();
      props.navigation.navigate("Home");
      //setFlag(false);
    }
  }, [props.isLogin, props.isShared]);

  const handleBiometric = async () => {
    TouchID.isSupported(Constants.TouchIdConfig).then(() => {
      TouchID.authenticate("", Constants.TouchIdConfig)
        .then(() => {
          signUp();
        })
        .catch(() => {
          console.log(error);
        });
    });
  };

  const signUp = () => {
    props.signUp(
      props.nationalNo,
      props.digitalNo,
      null,
      props.password,
      props.deviceUniqueId
    );
    setFlag(true);
  };
  regesterHandler = async () => {
    props.clearData();
    await AuthTokenStorage.removeToken();
    props.navigation.navigate("Register", {
      reset: true,
    });
  };

  const { route } = props;
  const reset = route.params;
  return (
    <View
      style={{
        flex: 1,
        //backgroundColor: !props.isLogin ? "white" : "#0877D0",
        backgroundColor: "#0877D0",
      }}>
      <View
        style={[
          styles.container,
          // !props.isLogin
          //   ? {
          //       position: "absolute",
          //       marginTop: 0,
          //       top: 0,
          //       width: "100%",
          //       opacity: 0,
          //     }
          //   : {},
        ]}>
        <View style={styles.imgLogo}>
          <Image source={Images.logoHeaderWezara} style={styles.img} />
        </View>
        <Text style={styles.txt}>
          {I18n.t("FIRST_STEP_REGESTER.HeaderNationalNumber")}
        </Text>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
            onPress={() => {
              Config.isDev ? signUp() : handleBiometric();
            }}>
            <KeyIcon />
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: "15%",
          }}
          onPress={() => {
            Config.isDev ? signUp() : handleBiometric();
          }}
        >
          <View>
            <SmallCircle login={true} />
            <View style={{ position: "absolute", top: 15, left: 15 }}></View>
          </View>
          <View style={{ position: "absolute", top: -10, left: -10 }}>
            <MideumCircle secend={true} login={true} />
          </View>
          <View style={{ position: "absolute", top: -20, left: -20 }}>
            <MideumCircle login={true} />
          </View>
        </TouchableOpacity> */}
        <Text style={styles.txt1}>{I18n.t("LOGIN.LoginMsg")}</Text>
        <Text style={styles.txt2}>{I18n.t("LOGIN.SignInMsg")}</Text>
        <TouchableOpacity
          onPress={() => {
            regesterHandler();
          }}>
          <Text style={styles.txt3}> {I18n.t("LOGIN.SignIn")}</Text>
        </TouchableOpacity>
        {/* <Text style={styles.txtPower}>{I18n.t("LOGIN.power")}</Text> */}
        {/* <Image source={Images.logoAr} style={styles.imgPower} /> */}
        <View
          style={{
            alignItems: "center",
            position: "absolute",
            bottom: -150,
            right: 0,
            left: 0,
          }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <BottomLogo />
            <Text
              style={{
                color: "white",
                fontFamily: "DINNextLTArabic-Regular",
                marginHorizontal: 20,
              }}>
              المشغل
            </Text>
          </View>
        </View>
      </View>
      {/* {!props.isLogin && (
        <AppLoading style={{ marginTop: "90%" }} white={true} />
      )} */}
    </View>
  );
};
const mapStateToProps = ({ register }) => ({
  deviceUniqueId: register.deviceUniqueId,
  nationalNo: register.nationalNo,
  password: register.password,
  digitalNo: register.digitalNo,
  dataToken: register.dataToken,
  isLogin: register.isLogin,
  isShared: register.isShared,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  const AuthRedux = require("@redux/AuthRedux");

  return {
    ...ownProps,
    ...stateProps,
    signUp: (nationalNo, digitalNo, sign, password, uniqueId) => {
      RegisterRedux.actions.signUp(
        dispatch,
        nationalNo,
        digitalNo,
        sign,
        password,
        uniqueId
      );
    },
    getUserInfo: () => {
      AuthRedux.actions.getUserInfo(dispatch);
    },
    clearData: () => {
      RegisterRedux.actions.clearData(dispatch);
    },
    checkDeviceLink: (uniqueId) => {
      RegisterRedux.actions.checkDeviceLink(dispatch, uniqueId);
    },
    resetLogin: () => {
      RegisterRedux.actions.resetLogin(dispatch);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(Login);
