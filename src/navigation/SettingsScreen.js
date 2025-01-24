import React, { PureComponent } from "react";

import { Settings } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";

export default class HomeScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
    };
  };

  render() {
    return <Settings navigation={this.props.navigation} />;
  }
}
