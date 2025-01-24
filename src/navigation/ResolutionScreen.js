import React, { PureComponent } from "react";

import { Resolution } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";

export default class ResolutionScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
    };
  };

  render() {
    return <Resolution navigation={this.props.navigation} />;
  }
}
