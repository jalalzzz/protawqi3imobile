import { Images, Config, Constants } from "@common";
import { Back, AppLoading } from "@components";
import { connect } from "react-redux";
import React, { useEffect } from "react";
import TouchID from "react-native-touch-id";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
import I18n from "@i18n";
import { Finger, MideumCircle, SmallCircle } from "@images";
import AuthTokenStorage from "@store/AuthTokenStorage";

const FourStepRegester = (props) => {
  useEffect(() => {
    if (props.dataToken) {
      AuthTokenStorage.storeToken(props.dataToken);
      props.getUserInfo()
      props.Home();
      setTimeout(() => {
        props.onChange(0);
      }, 2000);
    }
  }, [props.dataToken]);
  const handleBiometric = async () => {
    TouchID.isSupported(Constants.TouchIdConfig).then(() => {
      TouchID.authenticate("", Constants.TouchIdConfig)
        .then(() => {
          props.signUp(
            props.nationalNo,
            props.otp,
            props.sign,
            props.password,
            props.uniqueId
          );
        })
        .catch(() => {
          this.errorHandler(error);
        });
    });
  };
  const signUp = async () => {
    props.signUp(
      props.nationalNo,
      props.otp,
      props.sign,
      props.password,
      props.uniqueId
    );
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        style={
          props.isLoading
            ? {
                position: "absolute",
                marginTop:- 20,
                top: 0,
                width: "100%",
                opacity: 0,
              }
            : {}
        }
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <View
            style={Platform.select({
              ios: {
                alignSelf: "flex-end",
                position: "absolute",
                left: -5,
                top: 40,
              },
              android: {
                position: "absolute",
                left: 10,
              },
            })}
          >
            <Back
              onPress={() => {
                props.onChange(2);
              }}
            />
          </View>
          <Image source={Images.logoHeaderWezara} style={styles.img} />
        </View>

        <TouchableOpacity
          style={{
            alignSelf: "center",
            marginTop: "20%",
          }}
          onPress={() => {
            Config.isDev ? signUp() : handleBiometric();
          }}
        >
          <View>
            <SmallCircle />
            <View style={{ position: "absolute", top: 15, left: 15 }}>
              <Finger />
            </View>
          </View>
          <View style={{ position: "absolute", top: -10, left: -10 }}>
            <MideumCircle secend={true} />
          </View>
          <View style={{ position: "absolute", top: -20, left: -20 }}>
            <MideumCircle />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtBtm}>
          {I18n.t("FOUR_STEP_REGESTER.SignMsg")}
        </Text>
      </ScrollView>
      <View style={{marginTop:0}}>{props.isLoading && <AppLoading />}</View>
    </View>
  );
};
const mapStateToProps = ({ register }) => ({
  isLoading: register.isLoading,
  flagImei: register.flagImei,
  dataToken: register.token,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  const AuthRedux = require("@redux/AuthRedux");

  return {
    ...ownProps,
    ...stateProps,
    getUserInfo: () => {
      AuthRedux.actions.getUserInfo(dispatch);
    },
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
  };
}
export default connect(mapStateToProps, null, mergeProps)(FourStepRegester);
