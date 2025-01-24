import styles from "./styles";
import React, { PureComponent } from "react";
import { View, Dimensions, Text, ScrollView, Platform } from "react-native";
import { connect } from "react-redux";
import I18n from "@i18n";
import { Constants } from "@common";
const { width, height } = Dimensions.get("window");
class SignList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      signers: 0,
    };
  }

  componentDidMount = async () => {
    this.setState({ signers: 0 });
    await this.props.getSign(this.props.docSignGuid);
    setTimeout(() => {
      this.props.signInfo &&
        this.props.signInfo.map((item) => {
          if (
            (this.props.resolution &&
              item.DocSignUserStatusId ==
                Constants.docSignUserStatus.Confirmed) ||
            (!this.props.resolution &&
              item.DocSignUserStatusId == Constants.docSignUserStatus.Viewed)
          ) {
            this.setState({ signers: this.state.signers + 1 });
          }
        });
    }, 700);
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.rowData,
            {
              alignSelf:
                I18n.locale === "en-Us"
                  ? "flex-start"
                  : Platform.OS == "ios"
                  ? "flex-start"
                  : "flex-end",
              flexDirection:
                I18n.locale === "en-Us"
                  ? "row"
                  : Platform.OS == "ios"
                  ? "row"
                  : "row-reverse",
            },
          ]}>
          <Text style={styles.label}>
            {" "}
            {this.props.resolution
              ? I18n.t("Common.sign")
              : I18n.t("Common.signInv")}
            {"    "}
          </Text>
          <Text
            style={[
              styles.data,
              {
                alignSelf: I18n.locale === "en-Us" ? "flex-start" : "flex-end",
                marginHorizontal: 10,
              },
            ]}>
            {this.props.signInfo ? this.props.signInfo.length : 0}/
            {this.state.signers}
          </Text>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 350 }}>
          {this.props.signInfo
            ? this.props.signInfo.map((item, index) => {
                return (
                  <View
                    style={[
                      styles.rowData,
                      { justifyContent: "space-between" },
                    ]}>
                    <Text
                      style={{
                        color:
                          item.DocSignUserStatusId == 1
                            ? "#0877D0"
                            : item.DocSignUserStatusId == 2 ||
                              item.DocSignUserStatusId == 4
                            ? "green"
                            : "red",
                        width: "100%",
                        fontSize: width > 600 ? 20 : 16,
                        fontFamily: "DINNextLTArabic-Regular",
                        textAlign: Platform.OS == "android" ? "left" : "auto",
                      }}>
                      {item.DocSignUserStatusId ==
                      Constants.docSignUserStatus.Waiting
                        ? I18n.locale === "en-Us"
                          ? "Waiting for Signature"
                          : !this.props.resolution
                          ? "قيد معاينة الدعوة"
                          : "قيد التوقيع"
                        : item.DocSignUserStatusId ==
                            Constants.docSignUserStatus.Viewed ||
                          item.DocSignUserStatusId ==
                            Constants.docSignUserStatus.Confirmed
                        ? I18n.locale === "en-Us"
                          ? "Signed"
                          : this.props.resolution
                          ? "وقع"
                          : "تمت معاينة الدعوة"
                        : item.DocSignUserStatusId ==
                          Constants.docSignUserStatus.Refused
                        ? I18n.locale === "en-Us"
                          ? "Refused"
                          : this.props.resolution
                          ? "اعتذر عن التوقيع"
                          : "اعتذر عن الحضور"
                        : null}
                    </Text>

                    <Text
                      style={[
                        styles.data,
                        {
                          color: "#00000099",
                          textAlign: Platform.OS == "ios" ? "left" : "right",
                          width: "50%",
                          position: "absolute",
                        },
                      ]}>
                      {this.props.signInfo ? item.FullName : ""}
                    </Text>
                  </View>
                );
              })
            : null}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  signInfo: user.signInfo,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const UserRedux = require("@redux/UserRedux");

  return {
    ...ownProps,
    ...stateProps,
    getSign: (id) => {
      UserRedux.actions.getSign(dispatch, id);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(SignList);
