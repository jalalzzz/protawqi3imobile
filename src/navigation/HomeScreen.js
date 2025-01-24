import React, { PureComponent } from 'react';

import { Home } from '@containers';
import { Back, EmptyView } from './IconNav';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

class LoginScreen extends PureComponent {
  componentDidMount = async () => {
    let fmcToken = await AsyncStorage.getItem('fmcToken');
    DeviceInfo.getIpAddress().then((ip) => {
      //alert(ip);
      //console.log("IP 222: " + ip);
    });
    setTimeout(() => {
      var id = DeviceInfo.getUniqueId();

      this.props.sendFcmToken(fmcToken, id);
    }, 2000);
  };
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: () => Back(navigation),
      headerRight: () => EmptyView(),
      headerTitle: () => EmptyView(),
      headerShown: false,
    };
  };

  render() {
    return <Home navigation={this.props.navigation} route={this.props.route} />;
  }
}
const mapStateToProps = ({ register }) => ({
  deviceUniqueId: register.deviceUniqueId,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const pushNotificationsRedux = require('@redux/PushNotificationsRedux');
  return {
    ...ownProps,
    ...stateProps,
    sendFcmToken: (fcmToken, deviceUniqueId) => {
      pushNotificationsRedux.actions.sendFcmToken(
        dispatch,
        fcmToken,
        deviceUniqueId
      );
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(LoginScreen);
