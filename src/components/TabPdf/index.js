import { Constants, Images, Languages } from "@common";
import styles from "./styles";
import React, { PureComponent } from "react";
import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import I18n from "@i18n";
const { width, height } = Dimensions.get("window");
export default class TabPdf extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attachment: false,
      preview: true,
      signList: false,
      info: false,
    };
  }

  componentDidMount = async () => {
    this.props.clearAttachmentNotes();
  };
  attachmentHandler = () => {
    this.setState({ attachment: true, preview: false, signList: false ,info:false });
    this.props.onchangeIndex(1);
  };
  previewHandler = () => {
    this.setState({ attachment: false, preview: true, signList: false ,info:false });
    this.props.onchangeIndex(2);
  };
  info = () => {
    this.setState({ attachment: false, preview: false, signList: false ,info:true});
    this.props.onchangeIndex(3);
  };

  signListHandler = () => {
    this.setState({ attachment: false, preview: false, signList: true ,info:false});
    this.props.onchangeIndex(4);
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: Platform.OS !== "ios" ? "row" : "row-reverse",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginHorizontal: width < 650 ? 10 : 30,
            }}
            onPress={() => this.info()}
          >
            <AntDesign
              name="infocirlceo"
              size={24}
              color={this.state.info ? "#0877D0" : "#70707066"}
              style={{ padding: 10 }}
            />
          </TouchableOpacity>
          {this.props.unLimated && this.props.unLimated == "true" ? (
            <TouchableOpacity
              style={{
                width: width < 650 ? "27%" : "30%",
                padding: 10,
                alignSelf: "center",
              }}
              onPress={() => this.signListHandler()}
            >
              <Text
                style={{
                  color: this.state.signList ? "#0877D0" : "#70707066",
                  fontSize:width>550?15:  13,
                  textAlign: "center",
                  fontFamily: "DINNextLTArabic-Regular",
                  width: 120,
                  marginHorizontal: -13,
                }}
              >
                {this.props.resolution
                  ? I18n.t("DOC_SIGN.SigneesList")
                  : I18n.t("DOC_SIGN.SigneesListInv")}
              </Text>
            </TouchableOpacity>
          ) : null}
          {!this.props.resolution && (
            <TouchableOpacity
              style={{
                padding: 10,
                alignSelf: "center",
              }}
              onPress={() => this.attachmentHandler()}
            >
              <Text
                style={{
                  color: this.state.attachment ? "#0877D0" : "#70707066",
                  fontSize:width>550?15:  13,
                  textAlign: "center",
                  fontFamily: "DINNextLTArabic-Regular",
                }}
              >
                {I18n.t("DOC_SIGN.AttachmentRes")}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={{
              width: width < 650 ? "25%" : "30%",
              padding: 10,
              alignSelf: "center",
            }}
            onPress={() => this.previewHandler()}
          >
            <Text
              style={{
                color: this.state.preview ? "#0877D0" : "#70707066",
                fontSize:width>550?15:  13,
                textAlign: "center",
                fontFamily: "DINNextLTArabic-Regular",
              }}
            >
              {this.props.resolution
                ? I18n.t("DOC_SIGN.PreviewRes")
                : I18n.t("DOC_SIGN.PreviewInv")}
              {}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
