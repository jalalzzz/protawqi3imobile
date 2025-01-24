import { Constants, Images, Languages } from "@common";
import { Back, BottomLogo, ButtonSubmit, GetDeviceId } from "@components";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Button,
} from "react-native";
import I18n from "@i18n";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

class FirstStepRegester extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nationalNo: null,
      valid: false,
      isLoading: false,
      error: false,
      password: null,
      showDeviceId: false,
      errorMsg: null,
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.props.onChange(false);
    setTimeout(() => {
      this.props.checkDeviceLink(this.props.uniqueId);
    }, 500);
  };
  componentWillReceiveProps = async (nextProps) => {
    if (this.props.isShared !== nextProps.isShared) {
      this.props.sharedDevice(
        nextProps.isShared == Constants.DeviceType.shared ? true : false
      );
    }
    if (
      this.props.flagImei !== nextProps.flagImei &&
      nextProps.flagImei != null
    ) {
      this.setState({ error: false });
      if (nextProps.flagImei == true) {
        this.props.onChange(true);
        this.props.nationalNo(this.state.nationalNo);
        this.props.passwordData(this.state.password);
        this.setState({ loading: false });
      } else if (nextProps.flagImei == false) {
        this.props.onChange(false);
        this.setState({ error: true });
        this.setState({ loading: false });
      }
    }
    if (nextProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
    if (this.props.error !== nextProps.error) {
      this.setState({ loading: false });
      if (nextProps.error == "NationalNumberNotExist") {
        this.setState({
          errorMsg: I18n.t("FIRST_STEP_REGESTER.NotDoundNationalNumber"),
        });
      } else if (nextProps.error == "UserVerifyNotValid") {
        this.setState({
          errorMsg: I18n.t("FIRST_STEP_REGESTER.UserVerifyNotValid"),
        });
      } else if (nextProps.error == "DeviceNotLinked") {
        this.setState({
          errorMsg: I18n.t("FIRST_STEP_REGESTER.NotLink"),
        });
      } else if (nextProps.error == "DeviceNotActive") {
        this.setState({
          errorMsg: I18n.t("FIRST_STEP_REGESTER.Inactive"),
        });
      } else if (nextProps.error == "PasswordEmpty") {
        this.setState({
          errorMsg: I18n.t("FIRST_STEP_REGESTER.PasswordEmpty"),
        });
      } else if (nextProps.error == "ServerError") {
        this.setState({
          errorMsg: "Server error please try later",
        });
      } else if (nextProps.error == "DeviceNotLinkedToCurrentUser") {
        this.setState({
          errorMsg:
            I18n.locale === "en-Us"
              ? "Device not linked to current user"
              : "الجهاز غير مربوط بالمستخدم الحالي",
        });
      } else if (nextProps.error == "UserNotActive") {
        this.setState({
          errorMsg:
            I18n.locale === "en-Us" ? "User Not Active" : "المستخدم غير فعال",
        });
      } else {
        this.setState({
          errorMsg: nextProps.error,
        });
      }
    }
  };
  submit = async () => {
    this.setState({ loading: true });
    this.setState({ error: false });
    this.setState({
      errorMsg: null,
    });
    if (!this.state.nationalNo) {
      this.setState({ loading: false });
      this.setState({ error: true });
      if (this.state.nationalNo.length > 1) {
        this.setState({ loading: false });
        this.setState({
          errorMsg: I18n.t("FIRST_STEP_REGESTER.NotDoundNationalNumber"),
        });
      }

      return;
    }
    await this.props.checkNationalNoDeviceId(
      this.state.nationalNo,
      this.state.password,
      this.props.uniqueId
    );
  };
  back = () => {
    this.setState({ showDeviceId: false });
    this.props.getId(false);
  };
  render() {
    return (
      <>
        {this.state.showDeviceId && (
          <View
            style={Platform.select({
              ios: {},
              //   android: { position: "absolute", top: 25, left: 0 },
            })}
          >
            <Back
              onPress={() => {
                this.back();
              }}
              color={"white"}
            />
          </View>
        )}

        {!this.state.showDeviceId ? (
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 200,
              backgroundColor: "#0877d0",
            }}
          >
            <View style={{ backgroundColor: "#0877d0", height: "100%" }}>
              <View style={styles.imgLogo}>
                <Image
                  source={
                    I18n.locale === "en-Us"
                      ? Images.logoHeader
                      : Images.logoHeaderWezara
                  }
                  style={styles.img}
                />
              </View>
              <Text
                style={{
                  marginTop: width < 700 ? 5 : 15,
                  alignSelf: "center",
                  fontSize: width < 700 ? 17 : 30,
                  color: "#EFEFF4",
                  fontFamily: "DINNextLTArabic-Regular",
                  marginBottom: width < 700 ? -25 : -65,
                }}
              >
                {I18n.t("FIRST_STEP_REGESTER.HeaderNationalNumber")}
              </Text>
              <View>
                <KeyboardAvoidingView style={styles.contentLogin}>
                  <Text style={styles.txtContent}>
                    {I18n.t("FIRST_STEP_REGESTER.LoginNationalNumber")}
                  </Text>
                  <Text style={styles.txtSilver}>
                    {I18n.t("FIRST_STEP_REGESTER.NationalDescription")}
                  </Text>
                  <Text style={styles.txtInput}>
                    {I18n.t("FIRST_STEP_REGESTER.NationalNumber")}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      this.state.error
                        ? {
                            borderColor: "red",
                            borderWidth: 1,
                            textAlign:
                              I18n.locale === "en-Us" ? "left" : "right",
                          }
                        : {
                            borderColor: "#00000033",
                            borderWidth: 1,
                            textAlign:
                              I18n.locale === "en-Us" ? "left" : "right",
                          },
                    ]}
                    placeholder={I18n.t(
                      "FIRST_STEP_REGESTER.NationalNumberPlaceholder"
                    )}
                    keyboardType="numeric"
                    maxLength={20}
                    onChangeText={(i) => {
                      this.setState({ nationalNo: i });
                    }}
                    isLoading={this.props.isLoading}
                  />

                  <Text style={[styles.txtInput, { marginTop: 10.2 }]}>
                    {I18n.t("FIRST_STEP_REGESTER.PassFirst")}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      this.state.error
                        ? {
                            borderColor: "red",
                            borderWidth: 1,
                            textAlign:
                              I18n.locale === "en-Us" ? "left" : "right",
                          }
                        : {
                            borderColor: "#00000033",
                            borderWidth: 1,
                            textAlign:
                              I18n.locale === "en-Us" ? "left" : "right",
                          },
                    ]}
                    secureTextEntry
                    placeholder={I18n.t(
                      "FIRST_STEP_REGESTER.PasswordPlaceholder"
                    )}
                    onChangeText={(i) => {
                      this.setState({ password: i });
                    }}
                  />

                  <Text
                    style={[
                      styles.txtInput,
                      { marginTop: 20, marginBottom: -30, color: "red" },
                    ]}
                  >
                    {this.state.errorMsg}
                  </Text>
                  <View style={styles.btn}>
                    <ButtonSubmit
                      title={I18n.t("Common.Next")}
                      onPress={() => {
                        this.submit();
                      }}
                      //disabled={this.state.loading}
                      isLoading={this.state.loading}
                    />
                  </View>
                </KeyboardAvoidingView>
              </View>
            </View>

            {this.props.isDeviceLinked == false && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ showDeviceId: true });
                  this.props.getId(true);
                }}
                style={styles.txtID}
              >
                <Text style={styles.txtIDFont}>
                  {I18n.t("FIRST_STEP_REGESTER.GetDevice")}
                </Text>
              </TouchableOpacity>
            )}
            {!this.state.showDeviceId && (
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: width > 600 ? 20 : 60,
                }}
              >
                <BottomLogo />
              </View>
            )}
          </ScrollView>
        ) : (
          <GetDeviceId
            uniqueId={this.props.uniqueId}
            navigation={this.props.navigation}
            onChangeDevice={() => {
              this.setState({ showDeviceId: false });
              this.props.checkDeviceLink(this.props.uniqueId);
            }}
            back={() => {
              this.back();
            }}
            sharedDevice={(shared) => {
              shared
                ? this.props.sharedDevice(true)
                : this.props.sharedDevice(false);
            }}
          />
        )}
      </>
    );
  }
}
const mapStateToProps = ({ register }) => ({
  isCheck: register.isCheck,
  isLoading: register.isLoading,
  error: register.error,
  check: register.check,
  flagImei: register.flagImei,
  isDeviceLinked: register.isDeviceLinked,
  isShared: register.isShared,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  const PushNotificationsRedux = require("@redux/PushNotificationsRedux");
  return {
    ...ownProps,
    ...stateProps,
    checkNationalNoDeviceId: (nationalNo, password, uniqueId) => {
      RegisterRedux.actions.checkNationalNoDeviceId(
        dispatch,
        nationalNo,
        password,
        uniqueId
      );
    },
    checkDeviceLink: (uniqueId) => {
      RegisterRedux.actions.checkDeviceLink(dispatch, uniqueId);
    },
    sendFcmToken: (token) => {
      PushNotificationsRedux.actions.sendFcmToken(dispatch, token);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(FirstStepRegester);
