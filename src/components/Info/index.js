import React, { PureComponent } from "react";
import { View, Platform, Text } from "react-native";
import { connect } from "react-redux";
import styles from "./styles";
import I18n from "@i18n";
import { Constants } from "@common";
class Info extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await this.props.getInfoDocument(this.props.docSignGuid);
    this.props.onChangeInfo(
      this.props.docInfo ? this.props.docInfo.UserSignPageIndex : null
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>
          {this.props.resolution ? I18n.t("INFO.name") : I18n.t("INFO.nameInv")}
        </Text>
        <Text
          style={[
            styles.data,
            {
              textAlign:
                I18n.locale === "en-Us"
                  ? "left"
                  : Platform.OS == "ios"
                  ? "left"
                  : "right",
            },
          ]}>
          {this.props.docInfo ? this.props.docInfo.Name : I18n.t("Common.non")}
        </Text>

        <Text style={styles.label}>
          {this.props.resolution ? I18n.t("INFO.desc") : I18n.t("INFO.descInv")}{" "}
        </Text>
        <Text
          style={[
            styles.data,
            {
              textAlign:
                I18n.locale === "en-Us"
                  ? "left"
                  : Platform.OS == "ios"
                  ? "left"
                  : "right",
            },
          ]}>
          {this.props.docInfo && this.props.docInfo.Description
            ? this.props.docInfo.Description
            : I18n.t("Common.non")}
        </Text>
        {!this.props.resolution && (
          <>
            <Text style={styles.label}>{I18n.t("INFO.type")}</Text>
            <Text
              style={[
                styles.data,
                {
                  textAlign:
                    I18n.locale === "en-Us"
                      ? "left"
                      : Platform.OS == "ios"
                      ? "left"
                      : "right",
                },
              ]}>
              {this.props.docInfo.MeetingTypeName}
            </Text>
            <Text style={styles.label}>{I18n.t("INFO.date")}</Text>
            <Text
              style={[
                styles.data,
                {
                  textAlign:
                    I18n.locale === "en-Us"
                      ? "left"
                      : Platform.OS == "ios"
                      ? "left"
                      : "right",
                },
              ]}>
              {this.props.docInfo
                ? this.props.docInfo.MeetingDateStr
                  ? this.props.docInfo.MeetingDateStr
                  : I18n.t("Common.non")
                : null}
            </Text>
          </>
        )}
        <Text style={styles.label}>{I18n.t("INFO.status")}</Text>
        <Text
          style={[
            styles.data,
            {
              textAlign:
                I18n.locale === "en-Us"
                  ? "left"
                  : Platform.OS == "ios"
                  ? "left"
                  : "right",
            },
          ]}>
          {this.props.docInfo && this.props.docInfo.DocSignStatusId
            ? !this.props.resolution
              ? this.props.docInfo.DocSignStatusId == 1
                ? I18n.locale === "en-Us"
                  ? "Draft"
                  : "مسوده"
                : this.props.docInfo.DocSignStatusId == 2 &&
                  this.props.docInfo.IsUserConfirmed == null
                ? I18n.locale === "en-Us"
                  ? "Waiting for my signature"
                  : "بإنتظار معاينة الدعوة"
                : this.props.docInfo.DocSignStatusId == 2 &&
                  this.props.docInfo.IsUserConfirmed == true
                ? I18n.locale === "en-Us"
                  ? "Attendance confirmed"
                  : "تمت معاينة الدعوة"
                : this.props.docInfo.DocSignStatusId == 2 &&
                  this.props.docInfo.IsUserConfirmed == false
                ? I18n.locale === "en-Us"
                  ? "Refused to attend"
                  : "إعتذرت عن الحضور"
                : // : this.props.docInfo.DocSignStatusId == 3
                // ? I18n.locale === 'en-Us'
                //   ? 'Completed'
                //   : 'مكتمل'
                I18n.locale === "en-Us"
                ? "Waiting for others signature"
                : "بإنتظار معاينة الآخرين"
              : this.props.docInfo.DocSignStatusId == 1
              ? I18n.locale === "en-Us"
                ? "Draft"
                : "مسوده"
              : this.props.docInfo.DocSignStatusId == 2
              ? I18n.locale === "en-Us"
                ? "Waiting for my signature"
                : "بإنتظار توقيعي"
              : this.props.docInfo.DocSignStatusId == 3
              ? I18n.locale === "en-Us"
                ? "Completed"
                : "مكتمل"
              : I18n.locale === "en-Us"
              ? "Waiting for others signature"
              : " بإنتظار توقيع الآخرين"
            : I18n.t("Common.non")}
        </Text>
      </View>
    );
  }
}
const mapStateToProps = ({ user }) => ({
  docInfo: user.docInfo,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const UserRedux = require("@redux/UserRedux");

  return {
    ...ownProps,
    ...stateProps,
    getInfoDocument: (id) => {
      UserRedux.actions.getInfoDocument(dispatch, id);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(Info);
