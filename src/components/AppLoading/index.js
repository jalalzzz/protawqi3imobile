import React from "react";
import { View, Image, Dimensions } from "react-native";
import { Images } from "@common";

export default class Loading extends React.Component {
  render() {
    return (
      <View
        style={{
          alignSelf: "center",
          marginTop: this.props.attachment
            ? "50%"
            : Dimensions.get("window").width > 700
            ? "50%"
            : "75%",
        }}
      >
        <Image source={Images.loading} style={{ width: 100, height: 100 }} />
      </View>
    );
  }
}
