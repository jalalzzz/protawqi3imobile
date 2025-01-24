import React, { PureComponent } from "react";

import { SharedDevice } from "@containers";
import { Back, EmptyView } from "./IconNav";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthTokenStorage from "@store/AuthTokenStorage";

export default class SharedScreen extends PureComponent {
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
      <SharedDevice navigation={this.props.navigation} route={this.props.route} />
    );
  }
}
