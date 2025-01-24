import React, { PureComponent } from "react";

import { Register } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthTokenStorage from "@store/AuthTokenStorage";

export default class LoginScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
    };
  };

  render() {
    return (
      <Register navigation={this.props.navigation} route={this.props.route} />
    );
  }
}
