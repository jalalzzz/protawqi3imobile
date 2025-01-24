import { Constants, Config, Images } from "@common";
import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import I18n from "@i18n";
import styles from "./styles";
import { connect } from "react-redux";

import { MideumCircle, SmallCircle, Correct, Sign } from "@images";
import { ActivityIndicator } from "react-native-paper";
import TouchID from "react-native-touch-id";
import SignatureIcon from "../../../assets/icons/SignatureIcon";

const ConfirmPdf = (props) => {
  const [spinner, setSpinner] = useState(false);
  const [errorSign, setErrorSign] = useState(false);
  const [conf, setConf] = useState(false);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    // console.log(props.isShared);
    setConf(true);
    if (props.isUpdate && flag) {
      props.navigation.navigate("Home");
      setSpinner(false);
      setFlag(false);
      props.onChangePopup(true);
    }

    if (props.digital == true && flag) {
      setErrorSign(null);
      props.updateSign(
        props.docSignGuid,
        Constants.docSignUserStatus.Confirmed,
        null,
        props.longitude,
        props.latitude
      );
    } else if (props.digital == false && flag) {
      setSpinner(false);
      setErrorSign("لقد حدث خطأ");
    }
  }, [props.isUpdate, props.digital]);

  const res = () => {
    props.updateSign(
      props.docSignGuid,
      Constants.docSignUserStatus.Confirmed,
      null,
      props.longitude,
      props.latitude
    );
    setConf(false);
    props.onChangeRes(true);
  };
  const handleBiometric = async () => {
    TouchID.isSupported(Constants.TouchIdConfig).then(() => {
      TouchID.authenticate("", Constants.TouchIdConfig)
        .then(() => {
          props.resolution
            ? res()
            : props.updateSign(
                props.docSignGuid,
                Constants.docSignUserStatus.Confirmed,
                null,
                props.longitude,
                props.latitude
              );
          setSpinner(true);
          setFlag(true);
        })
        .catch((error) => {
          //console.log(error);
        });
    });
  };
  const goBack = () => {
    props.onChangeRes(false);
    props.goRes();
  };
  const signUp = async () => {
    //console.log(props.nationalNoShared, props.digitalNo, props.password);
    props.checkDigitalNumber(
      props.nationalNo ? props.nationalNo : props.nationalNoShared,
      props.digitalNo ? props.digitalNo : props.digitalNoShared,
      props.password ? props.password : props.passwordShared
    );
    setSpinner(true);
    setFlag(true);
  };
  return conf ? (
    <View>
      {!props.resolution && (
        <Text style={styles.title}> {I18n.t("Confirm.Title")}</Text>
      )}
      {props.resolution && (
        <>
          {/*  */}
          <View
            style={{
              backgroundColor: "white",
              width: "90%",
              alignSelf: "center",
              marginTop: 30,
              height: 200,
            }}
          >
            <Image
              style={styles.sign}
              source={{
                uri: props.imgSign && props.imgSign,
              }}
            />
            <Text
              style={{
                position: "absolute",
                top: 10,
                color: "#00000099",
                fontSize: 12,
                right: Dimensions.get("window").width > 500 ? 175 : 25,
                fontFamily: "DINNextLTArabic-Regular",
              }}
            >
              {I18n.t("Confirm.pos")}
            </Text>
          </View>
        </>
      )}
      <TouchableOpacity
        style={{
          alignSelf: "center",
          marginTop: Dimensions.get("window").width > 500 ? 75 : 30,
          marginBottom: 50,
        }}
        onPress={() => {
          Config.isDev ? signUp() : handleBiometric();
        }}
      >
        {props.isShared == Constants.DeviceType.shared ? (
          <TouchableOpacity
            onPress={() => {
              signUp();
            }}
          >
            <View>
              <SmallCircle />
              <View style={{ position: "absolute", top: 15, left: 15 }}>
                {props.resolution ? <Sign /> : <Correct />}
              </View>
            </View>
            <View style={{ position: "absolute", top: -10, left: -10 }}>
              <MideumCircle secend={true} />
            </View>
            <View style={{ position: "absolute", top: -20, left: -20 }}>
              <MideumCircle />
            </View>
          </TouchableOpacity>
        ) : (
          <SignatureIcon />
        )}
      </TouchableOpacity>

      <Text
        style={[
          styles.title,
          {
            marginTop: 20,
            fontFamily: "DINNextLTArabic-Regular",
            color: "#0877D0",
          },
        ]}
      >
        {props.isShared != Constants.DeviceType.shared
          ? I18n.t(props.resolution ? "Confirm.DescRes" : "Confirm.Desc")
          : I18n.t(
              props.resolution
                ? "Confirm.DescSharedResRes"
                : "Confirm.DescSharedInvRes"
            )}
      </Text>

      <Text
        style={[
          styles.title,
          {
            marginTop: 20,
            fontFamily: "DINNextLTArabic-Regular",
            color: "red",
          },
        ]}
      >
        {errorSign}
      </Text>
      {spinner && <ActivityIndicator color="#0877D0" size={"large"} />}
    </View>
  ) : (
    <>
      <Image
        style={{
          width: 75,
          height: 75,
          alignSelf: "center",
          marginTop: "50%",
          resizeMode: "contain",
        }}
        source={Images.Res}
      />
      <Text
        style={{
          alignSelf: "center",
          marginTop: "2%",
        }}
        source={Images.Res}
      >
        {I18n.t("Res_End.Title")}
      </Text>
      <TouchableOpacity onPress={() => goBack()}>
        <Text
          style={{
            alignSelf: "center",
            marginTop: "5%",
            color: "#0877D0",
          }}
          source={Images.Res}
        >
          {I18n.t("Res_End.Back")}
        </Text>
      </TouchableOpacity>
    </>
  );
};
const mapStateToProps = ({ register, user, location }) => ({
  isLoading: register.isLoading,
  flagImei: register.flagImei,
  isUpdate: user.isUpdate,
  dataToken: register.token,
  deviceUniqueId: register.deviceUniqueId,
  nationalNo: register.nationalNo,
  digital: register.digital,
  password: register.password,
  digitalNo: register.digitalNo,
  nationalNoShared: register.nationalNoShared,
  passwordShared: register.passwordShared,
  digitalNoShared: register.digitalNoShared,
  isShared: register.isShared,
  longitude: location.longitude,
  latitude: location.latitude,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;

  const UserRedux = require("@redux/UserRedux");
  const RegisterRedux = require("@redux/RegisterRedux");

  return {
    ...ownProps,
    ...stateProps,
    updateSign: (id, statusId, reason, longitude, latitude) => {
      UserRedux.actions.updateSign(
        dispatch,
        id,
        statusId,
        reason,
        longitude,
        latitude
      );
    },
    checkDigitalNumber: (nationalNo, digitalNo, password) => {
      RegisterRedux.actions.checkDigitalNumber(
        dispatch,
        nationalNo,
        digitalNo,
        password
      );
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(ConfirmPdf);
