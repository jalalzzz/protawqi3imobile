import { Constants, Images } from "@common";
import React, { PureComponent } from "react";
import { Platform, Dimensions, Text, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

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
        style={Platform.select({
          ios: {
            padding: 25,
            width: 100,
            alignSelf: "flex-end",
          },
          android: {
            marginTop: 24,
            padding: 25,
            // position: "absolute",
            left: 0,
          },
        })}
        onPress={this.props.onPress}
      >
        <Ionicons name="md-chevron-back-sharp" size={27} color={"#0877D0"} />
      </TouchableOpacity>
    );
  }
}
