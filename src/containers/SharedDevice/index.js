import { Constants, Images } from "@common";
import React, { PureComponent } from "react";
import {
  View,
  Dimensions,
  Image,
  Text,
  TextInput,
  PermissionsAndroid,
} from "react-native";
import DeviceInfo from "react-native-device-info";
import { connect } from "react-redux";
import styles from "./styles";
import { FirstStepSharedDevice } from "@components";

class SharedDevice extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userName: null,
      pass: null,
      erruserName: false,
      errpass: false,
      errLogin: false,
      imei: null,
      step: 0,
      isLoading: false,
      uniqueIdState: null,
      sharedDevice: null,
      nationalNo: null,
      password: null,
      getId: false,
      otpInfo: null,
      sign: null,
      showDeviceLinked: true,
    };
  }

  componentDidMount = async () => {
    this.setState({ uniqueIdState: DeviceInfo.getUniqueId() });
    var id = DeviceInfo.getUniqueId();
    this.props.checkDeviceLink(id);
  };
  componentWillReceiveProps = async (nextProps) => {
    if (nextProps.isLoading !== this.props.isLoading) {
      this.setState({ isLoading: nextProps.isLoading });
    }
  };

  render() {
    return (
      <FirstStepSharedDevice
        navigation={this.props.navigation}
        uniqueId={this.state.uniqueIdState}
      />
    );
  }
}
const mapStateToProps = ({ register }) => ({
  isLoading: register.isLoading,
  isCheck: register.isCheck,
  flagImei: register.flagImei,
  token: register.token,
});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require("@redux/RegisterRedux");
  const AuthRedux = require("@redux/AuthRedux");
  return {
    ...ownProps,
    ...stateProps,
    checkDeviceLink: (uniqueId) => {
      RegisterRedux.actions.checkDeviceLink(dispatch, uniqueId);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(SharedDevice);
