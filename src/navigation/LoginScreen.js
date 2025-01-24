import React, { PureComponent } from "react";

import { Login } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";

export default class LoginScreen extends PureComponent {
  static navigationOptions = ({ navigation,route }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
    };
  };

  render() {
    return <Login navigation={this.props.navigation} route={this.props.route}/>;
  }
}
