/** @format */
import React, { PureComponent } from "react";
import { StyleSheet, TouchableOpacityBase, View } from "react-native";
import { UserService } from "@services";
import AuthTokenStorage from "@store/AuthTokenStorage";
import { AppLoading } from "@components";
import { connect } from "react-redux";
import { Constants } from "@common";

class AuthLoadingScreen extends PureComponent {
  constructor(props) {
    super(props);

    this._bootstrapAsync();
  }

  componentDidMount = () => {
    this._bootstrapAsync();
    this.subs = [
      this.props.navigation.addListener("focus", (payload) => {
        this._bootstrapAsync();
      }),
    ];
  };

  componentWillReceiveProps = async (nextProps) => {
    if (this.props.isTokenCheck !== nextProps.isTokenCheck) {
      if (nextProps.error != null) {
        this.props.navigation.navigate("Register");
      }
      if (
        nextProps.isDeviceLinked &&
        nextProps.isShared == Constants.DeviceType.oneUser
      ) {
        this.props.navigation.navigate("Login");
      } else {
        if (nextProps.isShared == Constants.DeviceType.oneUser) {
          this.props.navigation.navigate("Register");
        } else if (nextProps.isShared == Constants.DeviceType.shared) {
          this.props.navigation.navigate("SharedDevice");
        } else {
          this.props.navigation.navigate("Login");
        }
      }
    }
  };

  // componentWillReceiveProps = (nextProps) => {
  //   this._bootstrapAsync();
  // };

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const token = await AuthTokenStorage.getToken();
    if (this.props.isShared == null) {
      if (this.props.isLogin) {
        this.props.navigation.navigate("Login");
      } else {
        this.props.navigation.navigate("Register");
      }
    } else {
      if (this.props.isShared == Constants.DeviceType.oneUser) {
        this.props.navigation.navigate("Login");
      } else if (this.props.isShared == Constants.DeviceType.shared) {
        this.props.navigation.navigate("SharedDevice");
      } else {
        this.props.navigation.navigate("Login");
      }
    }
  };

  // Render any loading content that you like here
  render() {
    return <AppLoading style={{ marginTop: "90%" }} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const mapStateToProps = ({ register }) => ({
  isTokenCheck: register.isTokenCheck,
  isDeviceLinked: register.isDeviceLinked,
  isShared: register.isShared,
  isLogin: register.isLogin,
  error: register.error,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");

  return {
    ...ownProps,
    ...stateProps,
    checkToken: (token) => {
      RegisterRedux.actions.checkToken(dispatch, token);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(AuthLoadingScreen);
