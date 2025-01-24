import { Constants, Images, Tools } from "@common";
import styles from "./styles";
import { RadioButton } from "react-native-paper";
import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  Platform,
} from "react-native";
import I18n from "@i18n";
import { LogOut, Profile } from "@images/svg";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ButtonSubmit } from "@components";
import { connect } from "react-redux";
import RNRestart from "react-native-restart";
import Svg, { G, Path } from "react-native-svg";
import NotificationsIcon from "react-native-vector-icons/Feather";

const { width, height } = Dimensions.get("window");
var lastName;
var firstName;
class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      checked: this.props.lang ? this.props.lang : "en",
      loading: false,
    };
  }

  componentDidMount = async () => {};

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  GetFirstAndLastName = (name) => {
    firstName = name.split(" ").slice(0, -1)[0];
    lastName = name.split(" ").slice(-1).join(" ");
    return `${firstName} ${lastName}`;
  };
  changeLanguge = () => {
    this.setState({ loading: true });
    this.props.spinner(this.state.loading);
    if (I18n.locale !== "ar-Us") {
      I18n.locale = "ar-Us";
    } else {
      I18n.locale = "en-Us";
    }
    this.setModalVisible(false);
    setTimeout(() => {
      this.setState({ loading: false });
    }, 2000);
    this.props.spinner(this.state.loading);
    this.props.refresh();
  };
  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: Platform.OS == "ios" ? "row-reverse" : "row",
          }}
        >
          <View style={styles.rightIcon}>
            <TouchableOpacity
              style={{ marginLeft: 0, marginTop: -10, padding: 10 }}
              onPress={this.props.logOut}
            >
              <LogOut />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: width > 700 ? 20 : 8,
                flexDirection: Platform.OS == "ios" ? "row-reverse" : "row",
              }}
              onPress={this.props.profile}
            >
              <Profile />
              <Text
                style={{
                  fontFamily: "DINNextLTArabic-Regular",
                  color: "white",
                  fontSize: width > 700 ? 22.5 : 15,
                  marginHorizontal: 10,
                  marginTop: -8,
                }}
              >
                {this.props.userName ? this.props.userName : ""}{" "}
              </Text>
            </TouchableOpacity>
            <View>
              {this?.props?.totalNotifications > 0 && (
                <View
                  style={{
                    padding: 6,
                    position: "absolute",
                    borderRadius: 10,
                    left: 17,
                    bottom: 20,
                    backgroundColor: "red",
                    zIndex: 1,
                  }}
                />
              )}
              <TouchableOpacity
                style={{
                  marginLeft: width > 700 ? 20 : 8,
                  flexDirection: Platform.OS == "ios" ? "row-reverse" : "row",
                }}
                onPress={this.props.notifications}
              >
                <NotificationsIcon name={"bell"} size={23} color={"white"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logo}>
            <Image
              source={
                I18n.locale === "en-Us" ? Images.logoHeader : Images.logoAr
              }
              style={styles.img}
            />
          </View>
        </View>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  {I18n.t("LANGUGES.Change")}
                </Text>
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                  <RadioButton
                    value="en"
                    status={
                      this.state.checked === "en" ? "checked" : "unchecked"
                    }
                    onPress={() => this.setState({ checked: "en" })}
                    uncheckedColor={"black"}
                    color={"#0877D0"}
                  />
                  {/* <Image
                    source={Images.english}
                    style={{
                      width: 25,
                      height: 25,
                      resizeMode: "contain",
                      marginHorizontal: 10,
                      marginTop: 3,
                    }}
                  /> */}
                  <Text
                    style={[
                      styles.txtLang,
                      {
                        color: this.state.checked == "en" ? "#0877D0" : "black",
                      },
                    ]}
                  >
                    {I18n.t("LANGUGES.English")}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 25 }}>
                  <RadioButton
                    value="ar"
                    status={
                      this.state.checked === "ar" ? "checked" : "unchecked"
                    }
                    onPress={() => this.setState({ checked: "ar" })}
                    uncheckedColor={"black"}
                    color={"#0877D0"}
                  />
                  <Text
                    style={[
                      styles.txtLang,
                      {
                        color: this.state.checked == "ar" ? "#0877D0" : "black",
                      },
                    ]}
                  >
                    {I18n.t("LANGUGES.Arabic")}
                  </Text>
                </View>
                <View
                  style={{ marginTop: 30, width: "50%", flexDirection: "row" }}
                >
                  <ButtonSubmit
                    title={I18n.t("Common.Save")}
                    onPress={() => {
                      this.changeLanguge();
                    }}
                  />
                  <View style={{ width: "100%", marginHorizontal: 5 }}>
                    <ButtonSubmit
                      title={I18n.t("Common.Close")}
                      onPress={() => {
                        this.setModalVisible(false);
                      }}
                      close={true}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </View>
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
export default connect(mapStateToProps, null, mergeProps)(Header);
