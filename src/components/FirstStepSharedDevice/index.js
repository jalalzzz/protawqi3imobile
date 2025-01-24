import { Constants, Images, Languages } from "@common";
import { ButtonSubmit, Back } from "@components";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import OTPTextInput from "../react-native-otp-textinput";
import I18n from "@i18n";
import {
  View,
  Dimensions,
  Text,
  Image,
  ScrollView,
  Platform,
} from "react-native";
import styles from "./styles";
const { width, height } = Dimensions.get("window");
import AuthTokenStorage from "@store/AuthTokenStorage";

class FirstStepSharedDevice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nationalNo: null,
      valid: false,
      otp: null,
      error: false,
    };
  }

  componentWillReceiveProps = async (nextProps) => {
    if (
      this.props.isSharedLoading !== nextProps.isSharedLoading &&
      nextProps.tokenShared
    ) {
      this.setState({ error: null });
      this.setState({ otp: null });
      if (
        this.props.tokenShared !== nextProps.tokenShared &&
        nextProps.tokenShared &&
        nextProps.isSharedError == false
      ) {
        this.setState({ error: null });
        this.otpInput.clear();

        AuthTokenStorage.storeToken(nextProps.tokenShared);
        this.props.getUserInfo();
        this.props.navigation.navigate("SanadVerification", {
          code: this.state.otp,
        });
      }
    } else if (nextProps.isSharedError) {
      this.setState({
        error:
          nextProps.errorShared == "UserNotExist"
            ? "رمز الجهاز المشترك الخاص بك غير موجود"
            : "لا يمكن إتمام هذه العملية لعدم إمكانية تسجيل الدخول بإستخدام معلومات حسابك, يرجى تسجيل الدخول مرة أخرى من خلال جهازك الخاص والمحاولة مرة أخرى",
      });
    }
  };
  submit = async (i) => {
    this.setState({ error: null });
    if (this.state.otp && this.state.otp.length == 4) {
      await this.props.checkShared(this.state.otp);
    } else {
      this.setState({ error: true });
    }
  };
  otp = (i) => {
    var otpValue = i;
    var otpNo = otpValue[0] + otpValue[1] + otpValue[2] + otpValue[3];
    this.setState({ otp: otpNo });
  };
  render() {
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View
            style={Platform.select({
              ios: {
                alignSelf: "flex-end",
                position: "absolute",
                left: -5,
              },
              android: {
                position: "absolute",
                left: 10,
              },
            })}
          ></View>
          <Image source={Images.logoHeaderWezara} style={styles.img} />
        </View>

        <Text style={styles.underHeader}>
          {I18n.t("SECEND_STEP_REGISTER.EnterOtp")}
        </Text>
        <Text style={[styles.underHeader, { marginTop: 10 }]}>
          {I18n.t("SECEND_STEP_REGISTER.SharedDvice")}
        </Text>
        <View style={{ width: "85%", alignSelf: "center", marginTop: 20 }}>
          <View style={{}}>
            <OTPTextInput
              ref={(e) => (this.otpInput = e)}
              onChange={(i) => {
                this.otp(i);
              }}
              offTintColor={this.state.error ? "red" : "#0877D0"}
              error={this.state.error}
              secend={true}
              otp={this.state.otp}
            />
          </View>
          {this.state.error ? (
            <Text
              style={{
                width: "55.5%",
                alignSelf: "center",
                color: "red",
                paddingTop: 10,
                textAlign: Platform.OS == "ios" ? "left" : "auto",
                fontSize: 14,
                fontFamily: "DINNextLTArabic-Regular",
              }}
            >
              {this.state.error}
            </Text>
          ) : null}
        </View>
        <Text style={styles.underOtp}>
          {I18n.t("SHARED_DEVICE_REGISTER.SharedDeviceDescription")}
        </Text>

        <View
          style={{
            width: width < 700 ? "83.5%" : "55%",
            alignSelf: "center",
            marginTop: this.state.error ? 25 : 50,
          }}
        >
          <ButtonSubmit
            title={I18n.t("Common.Submit")}
            onPress={() => {
              this.submit();
            }}
            isLoading={this.props.isSharedLoading}
          />
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = ({ register }) => ({
  digital: register.digital,
  isSharedLoading: register.isSharedLoading,
  isSharedError: register.isSharedError,
  errorShared: register.errorShared,
  tokenShared: register.tokenShared,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  const AuthRedux = require("@redux/AuthRedux");
  return {
    ...ownProps,
    ...stateProps,
    checkShared: (digitalNo, deviceUniqueId) => {
      RegisterRedux.actions.checkShared(dispatch, digitalNo, deviceUniqueId);
    },
    token: (nationalNo, digitalNo) => {
      RegisterRedux.actions.token(dispatch, nationalNo, digitalNo);
    },
    getUserInfo: () => {
      AuthRedux.actions.getUserInfo(dispatch);
    },
  };
}
export default connect(
  mapStateToProps,
  null,
  mergeProps
)(FirstStepSharedDevice);
