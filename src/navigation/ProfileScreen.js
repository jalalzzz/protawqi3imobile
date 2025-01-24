import React, { PureComponent } from "react";
import { Profile } from "@containers";
import { Back, EmptyView } from "./IconNav";

export default class ProfileScreen extends PureComponent {
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
      <Profile navigation={this.props.navigation} route={this.props.route} />
    );
  }
}
