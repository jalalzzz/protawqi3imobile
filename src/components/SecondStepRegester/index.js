import { Constants, Images, Languages } from "@common";
import { ButtonSubmit, Back } from "@components";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import OTPTextInput from "../react-native-otp-textinput";
import I18n from "@i18n";
import { View, Dimensions, Text, Image, ScrollView, Alert } from "react-native";
import styles from "./styles";
const { width, height } = Dimensions.get("window");
class FirstStepRegester extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nationalNo: null,
      valid: false,
      otp: null,
      error: false,
    };
  }

  componentDidMount = async () => {};
  componentWillReceiveProps = async (nextProps) => {};
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.isFetch !== this.props.isFetch) {
      this.setState({ error: false });
      if (nextProps.digital == true) {
        if (nextProps.hasSign) {
          this.props.onChange(3);
        } else {
          this.props.onChange(2);
        }
      } else if (nextProps.error == "TokenLocked") {
        this.setState({ error: true });
        Alert.alert(
          "خطأ في الحساب",
          ".حسابك غير فعال، يرجى مراجعة وزارة الأقتصاد الرقمي ",
          [
            {
              text: "OK",
              onPress: () => {
                //this.logoutCodeError();
              },
            },
          ]
        );
      } else if (nextProps.digital == false) {
        this.setState({ error: true });
      }
    }
  };
  submit = async (i) => {
    this.setState({ error: false });
    if (this.props.nationalNo && this.state.otp && this.state.otp.length == 4) {
      await this.props.checkDigitalNumber(
        this.props.nationalNo,
        this.state.otp,
        this.props.password
      );
      this.props.dataSignUp(this.props.nationalNo, this.state.otp);
    } else if (this.props.tokenShared) {
      if (this.state.otp.length === 4) {
        this.setState({ error: false });
        this.props.checkSharedDeviceWithSanad(
          this.props.code,
          this.state.otp,
          this.props.navigation,
          this.setState
        );
        if (this.props.error) {
          this.setState({ error: true });
        }
      } else {
        this.setState({ error: true });
      }
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
          >
            <Back
              onPress={() => {
                if (this.props.tokenShared) {
                  this.props.navigation.goBack();
                } else {
                  this.props.onChange(0);
                }
              }}
            />
          </View>

          <Image source={Images.logoHeaderWezara} style={styles.img} />
        </View>

        <Text style={styles.underHeader}>
          {I18n.t("SECEND_STEP_REGISTER.EnterOtp")}
        </Text>
        <Text style={[styles.underHeader, { marginTop: 10 }]}>
          {I18n.t("SECEND_STEP_REGISTER.EnterOtpSecend")}
        </Text>
        <View style={{ width: "85%", alignSelf: "center" }}>
          <View style={{}}>
            <OTPTextInput
              onChange={(i) => {
                this.otp(i);
              }}
              offTintColor={this.state.error ? "red" : "#0877D0"}
              error={this.state.error}
              secend={true}
            />
          </View>
          <Text style={styles.underOtp}>
            {I18n.t("SECEND_STEP_REGISTER.OtpDescription")}
          </Text>
          <Text style={[styles.underOtp, { marginTop: 5, width: "100%" }]}>
            {I18n.t("SECEND_STEP_REGISTER.OtpDescriptionTwo")}
          </Text>
          <Text style={[styles.underOtp, { marginTop: 5, width: "100%" }]}>
            {I18n.t("SECEND_STEP_REGISTER.OtpDescriptionSanad")}
          </Text>
        </View>

        <View
          style={{
            width: width < 700 ? "83.5%" : "55%",
            alignSelf: "center",
            marginTop: 75,
          }}
        >
          <ButtonSubmit
            title={I18n.t("Common.Submit")}
            onPress={() => {
              this.submit();
            }}
            isLoading={this.props.isFetch}
          />
        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = ({ register }) => {
  return {
    digital: register.digital,
    isFetch: register.isFetch,
    hasSign: register.hasSign,
    nationalNoShare: register.nationalNoShared,
    tokenShared: register.tokenShared,
    error: register.error,
  };
};
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  return {
    ...ownProps,
    ...stateProps,
    checkDigitalNumber: (nationalNo, digitalNo, password) => {
      RegisterRedux.actions.checkDigitalNumber(
        dispatch,
        nationalNo,
        digitalNo,
        password
      );
    },
    token: (nationalNo, digitalNo) => {
      RegisterRedux.actions.token(dispatch, nationalNo, digitalNo);
    },
    checkSharedDeviceWithSanad: (code, sanadCode, navigation, setState) => {
      RegisterRedux.actions.checkSharedDeviceWithSanad(
        dispatch,
        code,
        sanadCode,
        navigation,
        setState
      );
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(FirstStepRegester);
