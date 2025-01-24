import React, { PureComponent } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { ThirdStepRegester } from "@components";
import { connect } from "react-redux";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Languages } from "@common";
import Moment from "moment";
import I18n from "@i18n";
class Profile extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      changeSign: false,
    };
  }

  componentDidMount = async () => {
    Moment.locale("en");
    await this.props.getUserInfo();
  };
  back = () => {
    this.state.changeSign
      ? this.setState({ changeSign: false })
      : this.props.navigation.goBack();
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.isChange !== this.props.isChange) {
      await this.props.getUserInfo();
      this.setState({ changeSign: false });
    }
  };
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.rightIcon}>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 40,
                bottom: 1,
                // marginLeft: 10,
                // padding: 20,
                // margin: -40,
              }}
              onPress={() => {
                this.back();
              }}
            >
              <Ionicons
                name="md-chevron-forward-sharp"
                size={24}
                color="white"
              />
            </TouchableOpacity>

            <View>
              <Text style={styles.text}>
                {this.props.invitationViewOnly == "true"
                  ? I18n.t("PROFILE.Secretary")
                  : I18n.t("PROFILE.Minister")}
              </Text>
            </View>
          </View>
        </View>
        {this.state.changeSign ? (
          <ThirdStepRegester OnChangeSign={true} />
        ) : (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 150 }}
            style={styles.profileData}
          >
            <View style={[styles.containerData, { marginTop: "5%" }]}>
              <Text style={styles.label}>{I18n.t("PROFILE.FullName")}</Text>
              <Text
                style={[
                  styles.data,
                  {
                    textAlign:
                      I18n.locale === "en-Us"
                        ? "left"
                        : Platform.OS !== "ios"
                        ? "right"
                        : "left",
                  },
                ]}
              >
                {this.props.userInfo &&
                  `${this.props.userInfo.nickName} ${this.props.userInfo.name}`}
              </Text>
            </View>
            <View style={styles.containerData}>
              <Text style={styles.label}>
                {I18n.t("PROFILE.NationalNumber")}
              </Text>
              <Text
                style={[
                  styles.data,
                  {
                    textAlign:
                      I18n.locale === "en-Us"
                        ? "left"
                        : Platform.OS !== "ios"
                        ? "right"
                        : "left",
                  },
                ]}
              >
                {this.props.userInfo && this.props.userInfo.nationalNo}
              </Text>
            </View>
            <View style={styles.containerData}>
              <Text style={styles.label}>{I18n.t("PROFILE.Dob")} </Text>
              <Text
                style={[
                  styles.data,
                  {
                    textAlign:
                      I18n.locale === "en-Us"
                        ? "left"
                        : Platform.OS !== "ios"
                        ? "right"
                        : "left",
                  },
                ]}
              >
                {this.props.userInfo && this.props.userInfo.dOB}
              </Text>
            </View>
            {this.props.invitationViewOnly == "true" && (
              <View style={styles.containerData}>
                <Text style={styles.label}>{I18n.t("PROFILE.Department")}</Text>
                <Text
                  style={[
                    styles.data,
                    {
                      textAlign:
                        I18n.locale === "en-Us"
                          ? "left"
                          : Platform.OS !== "ios"
                          ? "right"
                          : "left",
                    },
                  ]}
                >
                  {this.props.userInfo && this.props.userInfo.department}
                </Text>
              </View>
            )}

            <View style={styles.containerData}>
              <Text style={styles.label}>{I18n.t("PROFILE.JobTitle")}</Text>
              <Text
                style={[
                  styles.data,
                  {
                    textAlign:
                      I18n.locale === "en-Us"
                        ? "left"
                        : Platform.OS !== "ios"
                        ? "right"
                        : "left",
                  },
                ]}
              >
                {this.props.userInfo && this.props.userInfo.jobTitleName}
              </Text>
            </View>

            <View style={styles.containerData}>
              <Text style={styles.label}>{I18n.t("PROFILE.Email")}</Text>
              <Text
                style={[
                  styles.data,
                  {
                    textAlign:
                      I18n.locale === "en-Us"
                        ? "left"
                        : Platform.OS !== "ios"
                        ? "right"
                        : "left",
                  },
                ]}
              >
                {this.props.userInfo && this.props.userInfo.email}
              </Text>
            </View>
            <View style={styles.containerData}>
              <Text style={styles.label}>{I18n.t("PROFILE.Number")}</Text>
              <Text
                style={[
                  styles.data,
                  {
                    textAlign:
                      I18n.locale === "en-Us"
                        ? "left"
                        : Platform.OS !== "ios"
                        ? "right"
                        : "left",
                  },
                ]}
              >
                {this.props.userInfo && this.props.userInfo.mobileNo
                  ? this.props.userInfo.mobileNo
                  : "لا يوجد"}
              </Text>
            </View>

            <View
              style={[
                styles.containerData,
                { flexDirection: "row", justifyContent: "space-between" },
              ]}
            >
              <Text style={styles.label}>
                {I18n.t("PROFILE.CertifiedSignature")}
              </Text>
              <Image
                style={styles.sign}
                source={{
                  uri: this.props.userInfo && this.props.userInfo.signImg,
                }}
              />

              <TouchableOpacity
                onPress={() => {
                  this.setState({ changeSign: true });
                }}
              >
                <Feather
                  name="edit"
                  size={23}
                  color="#0877D0"
                  style={{ marginTop: 5, marginLeft: 10 }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
const mapStateToProps = ({ auth, register }) => ({
  userInfo: auth.userInfo,
  isChange: register.isChange,
  invitationViewOnly: register.invitationViewOnly,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const AuthRedux = require("@redux/AuthRedux");

  return {
    ...ownProps,
    ...stateProps,
    getUserInfo: () => {
      AuthRedux.actions.getUserInfo(dispatch);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(Profile);
