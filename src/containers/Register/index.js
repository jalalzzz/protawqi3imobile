import { Constants, Images } from '@common';
import React, { PureComponent } from 'react';
import {
  View,
  Dimensions,
  Image,
  Text,
  TextInput,
  PermissionsAndroid,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { connect } from 'react-redux';
import styles from './styles';
import {
  SecondStepRegester,
  FirstStepRegester,
  ThirdStepRegester,
  FourStepRegester,
  FirstStepSharedDevice,
} from '@components';

class Login extends PureComponent {
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
    //alert(111);
    // Get Local IP
    DeviceInfo.getIpAddress().then((ip) => {
      //alert(ip);
      //console.log("IP111 : " + ip);
    });

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
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              this.state.step == 0 && !this.state.getId ? '#0877D0' : 'white',
          },
        ]}>
        {this.state.step == 0 && (
          <FirstStepRegester
            onChange={(i) => {
              i == true
                ? this.setState({ step: 1 })
                : this.setState({ step: 0 });
            }}
            nationalNo={(i) => {
              this.setState({ nationalNo: i });
            }}
            passwordData={(i) => {
              this.setState({ password: i });
            }}
            uniqueId={this.state.uniqueIdState}
            getId={(i) => {
              this.setState({ getId: i });
              this.forceUpdate();
            }}
            navigation={this.props.navigation}
            sharedDevice={(val) => {
              if (!val) this.setState({ sharedDevice: val });
              else this.props.navigation.navigate('SharedDevice');
            }}
          />
        )}

        {this.state.step == 1 && (
          <SecondStepRegester
            navigation={this.props.navigation}
            onChange={(i) => {
              this.setState({ step: i });
            }}
            nationalNo={this.state.nationalNo}
            dataSignUp={(nationl, otp) => {
              this.setState({ nationalNo: nationl, otpInfo: otp });
            }}
            password={this.state.password}
            uniqueId={DeviceInfo.getUniqueId()}
          />
        )}
        {this.state.step == 2 && (
          <ThirdStepRegester
            navigation={this.props.navigation}
            onChange={(i) => {
              this.setState({ step: i });
            }}
            nationalNo={this.state.nationalNo}
            otp={this.state.otpInfo}
            signUpData={(signBase64) => {
              this.setState({ sign: signBase64 });
            }}
          />
        )}
        {this.state.step == 3 && (
          <FourStepRegester
            navigation={this.props.navigation}
            onChange={(i) => {
              this.setState({ step: 0 });
            }}
            Home={() => {
              this.props.navigation.navigate('Home');
            }}
            nationalNo={this.state.nationalNo}
            otp={this.state.otpInfo}
            sign={this.state.sign}
            password={this.state.password}
            uniqueId={DeviceInfo.getUniqueId()}
          />
        )}
      </View>
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
  const RegisterRedux = require('@redux/RegisterRedux');
  return {
    ...ownProps,
    ...stateProps,
    checkDeviceLink: (uniqueId) => {
      RegisterRedux.actions.checkDeviceLink(dispatch, uniqueId);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(Login);
