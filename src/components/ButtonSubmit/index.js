import { Constants, Images } from "@common";
import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
const { width, height } = Dimensions.get("window");
export default class ButtonSubmit extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      pass: null,
      erruserName: false,
      errpass: false,
      errLogin: false,
    };
  }

  componentDidMount = async () => {};

  render() {
    return (
      <TouchableOpacity
        style={{
          width: "100%",

          backgroundColor: this.props.close ? "red" : "#0877D0",
          flexDirection: "row",
          justifyContent: "center",
        }}
        onPress={this.props.onPress}
        //disabled={this.props.isLoading ? true : false}
      >
        <Text
          style={{
            textAlign: "center",
            padding: "2.5%",
            color: "#fff",
            fontFamily: "DINNextLTArabic-Regular",
            fontSize: width < 700 ? 15 : 22,
          }}>
          {this.props.title}
        </Text>
        {this.props.isLoading && (
          <ActivityIndicator
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              marginRight: "20%",
            }}
            color={"white"}
          />
        )}
      </TouchableOpacity>
    );
  }
}
