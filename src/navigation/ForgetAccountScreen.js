import React, { PureComponent } from "react";

import { ForgetAccount } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";

export default class ForgetAccountScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
    };
  };

  render() {
    return <ForgetAccount navigation={this.props.navigation} />;
  }
}
