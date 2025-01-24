import React, { PureComponent } from "react";

import { Pdf } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";

export default class PdfScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
      gestureEnabled: false
    };
  };

  render() {
    return <Pdf navigation={this.props.navigation} route={this.props.route} />;
  }
}
