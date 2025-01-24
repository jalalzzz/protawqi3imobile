import React, { Fragment, PureComponent } from "react";
import { Constants, Images, Languages } from "@common";
import { ButtonSubmit, Back, Signuture } from "@components";
import { connect } from "react-redux";
import AuthTokenStorage from "../../store/AuthTokenStorage";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
  Platform,
  ScrollView,
} from "react-native";
import styles from "./styles";
import { SmallPen } from "@images/svg";
import I18n from "@i18n";

class FirstStepRegester extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nationalNo: null,
      valid: false,
      color: 1,
      pen: 1,
      sign64: null,
      errorSign: false,
    };
  }
  componentDidMount = async () => {};
  componentWillReceiveProps = async (nextProps) => {};
  saveSign = async () => {
    //for onchange sign on the user info
    if (this.state.sign64 && this.props.OnChangeSign) {
      if (this?.props?.RBSheetRef) {
        this?.props?.RBSheetRef.close();
      }
      await this.props.changeSign(
        this.state.sign64,
        this?.props?.checkToUpdateSignPic
      );
    } else {
      this.setState({ errorSign: true });
    }
    //for step 3 => register
    if (this.state.sign64 && !this.props.OnChangeSign) {
      this.setState({ errorSign: false });
      this.props.signUpData(this.state.sign64);
      this.props.onChange(3);
    } else {
      this.setState({ errorSign: true });
    }
  };

  render() {
    return (
      // <ScrollView
      //   contentContainerStyle={{
      //     paddingBottom: Dimensions.get("window").width > 700 ? 300 : 180,
      //   }}
      // >
      <Fragment>
        {!this.props.OnChangeSign ? (
          <>
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
                    this.props.onChange(1);
                  }}
                />
              </View>
              <Image source={Images.logoHeaderWezara} style={styles.img} />
            </View>
            <Text style={styles.underHeader}>
              {I18n.t("THIRD_STEP_REGISTER.HeaderSign")}
            </Text>
          </>
        ) : (
          <Text style={[styles.underHeader, { marginTop: 50 }]}>
            {I18n.t("THIRD_STEP_REGISTER.Change")}
          </Text>
        )}

        <View
          style={{
            height: Dimensions.get("window").width > 700 ? 500 : 250,
            padding: 10,
            width: Dimensions.get("window").width > 700 ? "95%" : "100%",
            marginTop: -10,
            zIndex: 999999999999,
            alignSelf: "center",
          }}
        >
          <Signuture
            color={
              this.state.color == 0
                ? "#000000"
                : this.state.color == 1
                ? "#0064AF"
                : this.state.color == 2
                ? "#767677"
                : "#000000"
            }
            pen={this.state.pen}
            nextStep={(sign) => {
              this.setState({ sign64: sign });
            }}
            error={this.state.errorSign}
            height={Dimensions.get("window").width > 700 ? 500 : 250}
          />
        </View>
        <View style={{ width: "85%", alignSelf: "center", marginTop: 10 }}>
          <ButtonSubmit
            title={I18n.t("Common.Cont")}
            onPress={() => {
              this.saveSign();
            }}
          />
        </View>
        <View
          style={{
            marginTop: Platform.OS === "ios" ? 100 : "20%",
            flexDirection: "row",
            justifyContent: "flex-start",
            marginHorizontal: -10,
          }}
        >
          {/* <TouchableOpacity
            onPress={() => {
              this.setState({ pen: 0 });
            }}
          >
            <View
              style={[
                styles.imgPen,
                {
                  marginHorizontal:
                    Dimensions.get("window").width < 700 ? 50 : 100,
                },
              ]}
            >
              <Image
                source={Images.penTawqi3i1}
                style={[
                  {
                    marginTop: this.state.pen == 0 ? -50 : 0,
                    marginHorizontal: "0%",
                    width: 50,
                    height: 150,
                    resizeMode: "contain",
                  },
                ]}
              />
            </View>
          </TouchableOpacity> */}
          {/* <TouchableOpacity
            onPress={() => {
              this.setState({ pen: 1 });
            }}
            style={{
              marginHorizontal: Dimensions.get("window").width < 700 ? 0 : -10,
            }}
          >
            <Image
              source={Images.penTawqi3i}
              style={[
                {
                  marginTop: this.state.pen == 1 ? -50 : 0,
                  marginHorizontal: "0%",
                  width: 50,
                  height: 150,
                  resizeMode: "contain",
                },
              ]}
            />
          </TouchableOpacity> */}
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: Dimensions.get("window").width < 700 ? 10 : 150,
              justifyContent: "space-around",
              marginTop: 25,
            }}
          >
            {/* <TouchableOpacity
              style={{
                width: this.state.color == 0 ? 33 : 28,
                height: this.state.color == 0 ? 33 : 28,
                backgroundColor: "black",
                marginTop: this.state.color == 0 ? "10%" : "15%",
                borderRadius: 5,
                marginHorizontal: 7,
              }}
              onPress={() => {
                this.setState({ color: 0 });
              }}
            />
            <TouchableOpacity
              style={{
                width: this.state.color == 1 ? 33 : 28,
                height: this.state.color == 1 ? 33 : 28,
                backgroundColor: "#0064AF",
                marginTop: this.state.color == 1 ? "10%" : "15%",
                borderRadius: 5,
                marginHorizontal: 7,
              }}
              onPress={() => {
                this.setState({ color: 1 });
              }}
            />
            <TouchableOpacity
              style={{
                width: this.state.color == 2 ? 33 : 28,
                height: this.state.color == 2 ? 33 : 28,
                backgroundColor: "#767677",
                marginTop: this.state.color == 2 ? "10%" : "15%",
                borderRadius: 5,
                marginHorizontal: 7,
              }}
              onPress={() => {
                this.setState({ color: 2 });
              }}
            /> */}
          </View>
        </View>
      </Fragment>
      // </ScrollView>
    );
  }
}
const mapStateToProps = ({ register, lang }) => ({
  isLoading: register.isLoading,
  flagImei: register.flagImei,
  token: register.token,
  dataToken: register.token,
  lang: lang.lang,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  const AuthRedux = require("@redux/AuthRedux");
  return {
    ...ownProps,
    ...stateProps,
    changeSign: (sign, checkToUpdateSignPic) => {
      RegisterRedux.actions.changeSign(dispatch, sign, checkToUpdateSignPic);
    },
    getUserInfo: () => {
      AuthRedux.actions.getUserInfo(dispatch);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(FirstStepRegester);
