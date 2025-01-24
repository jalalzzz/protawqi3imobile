import React, { PureComponent } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  Dimensions,
} from "react-native";
import I18n from "@i18n";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Tools from "@common/Tools";
import { Constants, Images, Languages } from "@common";
import styles from "./styles";
import { PdfIcon } from "@images/svg";

class PdfItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};

  render() {
    const { invitees, resolution } = this.props;
    console.log(resolution, "incard");
    return (
      <TouchableOpacity
        style={[
          styles.pdf,
          { backgroundColor: "white", borderColor: "white", borderWidth: 1 },
        ]}
        onPress={this.props.onPress}
      >
        <View
          style={[
            styles.rowContent,
            {
              flexDirection:
                I18n.locale === "en-Us"
                  ? "row"
                  : Platform.OS !== "ios"
                  ? "row-reverse"
                  : "row",
            },
          ]}
        >
          <View style={styles.imgView}>
            {/* <Image style={styles.img} source={Images.pdf} /> */}
            <PdfIcon style={styles.img} />

            {!this.props.newItem && (
              <Text
                style={{
                  position: "absolute",
                  bottom: -13,
                  left: Dimensions.get("window").width > 700 ? 105 : 30,
                  fontSize: 17,
                  color: "red",
                  fontFamily: "DINNextLTArabic-Regular",
                }}
              >
                جديد
              </Text>
            )}
          </View>
          <View style={styles.information}>
            <View>
              <View
                style={{
                  alignSelf:
                    I18n.locale === "en-Us"
                      ? "flex-start"
                      : Platform.OS == "ios"
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                <Text
                  style={{
                    marginTop: 8,
                    width: "100%",
                    fontSize: 15,
                    color: "#00000099",
                    fontFamily: "DINNextLTArabic-Regular",
                    alignSelf:
                      I18n.locale === "en-Us"
                        ? "flex-start"
                        : Platform.OS == "ios"
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  {this.props.name &&
                    Tools.formatDocSignNameLength(
                      this.props.name,
                      Dimensions.get("window").width
                    )}
                </Text>

                <Text
                  style={{
                    marginTop: Dimensions.get("window").width > 700 ? 12 : 5,
                    width: "100%",
                    fontSize: 13,
                    color: "#00000099",
                    fontFamily: "DINNextLTArabic-Regular",
                    alignSelf:
                      I18n.locale === "en-Us"
                        ? "flex-start"
                        : Platform.OS == "ios"
                        ? "flex-start"
                        : "flex-end",
                  }}
                >
                  {/* {this.props..meetingDate} */}
                  {this.props.meetingDate}
                </Text>
              </View>
              <View
                style={{
                  alignSelf:
                    I18n.locale === "en-Us"
                      ? "flex-start"
                      : Platform.OS == "ios"
                      ? "flex-start"
                      : "flex-end",
                }}
              >
                <Text
                  style={{
                    marginTop: Dimensions.get("window").width > 700 ? 12 : 5,
                    width: "100%",
                    fontSize: 13,
                    color: "#00000099",
                    fontFamily: "DINNextLTArabic-Regular",
                    fontSize: 13,
                    color: "#00000099",
                  }}
                >
                  {this.props.number}
                </Text>
              </View>
              <View
                style={{
                  flexDirection:
                    I18n.locale === "en-Us"
                      ? "row-reverse"
                      : Platform.OS == "ios"
                      ? "row-reverse"
                      : "row",
                  alignSelf:
                    I18n.locale === "en-Us"
                      ? "flex-start"
                      : Platform.OS == "ios"
                      ? "flex-start"
                      : "flex-end",
                  marginTop: Dimensions.get("window").width > 700 ? 12 : 5,
                }}
              >
                <Text
                  style={{
                    marginTop: 0,
                    marginHorizontal: 8,
                    fontSize: 13,
                    fontFamily: "DINNextLTArabic-Regular",
                  }}
                >
                  {this.props.resolution
                    ? this.props.docSignStatusId == 1
                      ? I18n.locale === "en-Us"
                        ? "Draft"
                        : "مسوده"
                      : this.props.docSignStatusId == 2
                      ? I18n.locale === "en-Us"
                        ? "Waiting for my signature"
                        : "بإنتظار توقيعي"
                      : this.props.docSignStatusId == 3
                      ? I18n.locale === "en-Us"
                        ? "Completed"
                        : "مكتمل"
                      : I18n.locale === "en-Us"
                      ? "Waiting for others signature"
                      : " بإنتظار توقيع الآخرين"
                    : this.props.docSignStatusId == 1
                    ? I18n.locale === "en-Us"
                      ? "Draft"
                      : "مسوده"
                    : this.props.docSignStatusId == 2 &&
                      this.props.isUserConfirmed == null
                    ? I18n.locale === "en-Us"
                      ? "Waiting for my signature"
                      : "بإنتظار معاينة الدعوة"
                    : this.props.docSignStatusId == 2 &&
                      this.props.isUserConfirmed == true
                    ? I18n.locale === "en-Us"
                      ? "Attendance confirmed"
                      : "تمت معاينة الدعوة"
                    : this.props.docSignStatusId == 2 &&
                      this.props.isUserConfirmed == false
                    ? I18n.locale === "en-Us"
                      ? "Refused to attend"
                      : "إعتذرت عن الحضور"
                    : I18n.locale === "en-Us"
                    ? "Sent"
                    : "مرسلة"}
                </Text>
                <View
                  style={{
                    marginTop: 6,
                    backgroundColor: this.props.resolution
                      ? this.props.docSignStatusId == 2
                        ? "#ffa500"
                        : this.props.docSignStatusId == 3
                        ? "#34C759"
                        : "#0877D0"
                      : this.props.docSignStatusId == 2 &&
                        this.props.isUserConfirmed == null
                      ? "#ffa500"
                      : this.props.docSignStatusId == 2 &&
                        this.props.isUserConfirmed == true
                      ? "#34C759"
                      : this.props.docSignStatusId == 2 &&
                        this.props.isUserConfirmed == false
                      ? "#ff0000"
                      : "#0877D0",
                    height: 10,
                    width: 10,
                    borderRadius: 30,
                  }}
                />
              </View>
            </View>
          </View>

          <View
            style={[
              styles.icon,
              {
                right: I18n.locale === "ar-Us" ? null : 0,
                left: I18n.locale === "en-Us" ? null : 0,
                alignItems: "center",
              },
            ]}
          >
            {this.props.unLimated == true && (
              <Text
                style={{
                  position: "absolute",
                  left: 20,
                  top: -20,
                  color: "#34C759",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                {invitees}
              </Text>
            )}

            {!resolution && (
              <AntDesign
                name={I18n.locale === "en-Us" ? "right" : "left"}
                style={{}}
                size={20}
                color={"#00000066"}
              />
            )}
            {resolution?.resolutionType?.Id === 2 && (
              <Image
                source={require("../../images/icons/JordanLogo.png")}
                style={{ width: 40, height: 60, marginTop: 10 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const mapStateToProps = ({ lang }) => ({
  lang: lang.lang,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const LangRedux = require("@redux/LangRedux");
  return {
    ...ownProps,
    ...stateProps,

    switchLanguage: (lang) => {
      LangRedux.actions.switchLanguage(dispatch, lang);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(PdfItem);
