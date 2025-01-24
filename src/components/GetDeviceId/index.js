import { Constants, Images, Languages } from '@common';
import { Back, ButtonSubmit } from '@components';
import { connect } from 'react-redux';
import React, { PureComponent } from 'react';
import {
  View,
  Dimensions,
  Text,
  Image,
  platform,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import I18n from '@i18n';
import styles from './styles';
import OTPTextInput from '../react-native-otp-textinput';
const { width, height } = Dimensions.get('window');

class GetDeviceId extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nationalNo: null,
      otp: null,
      msg: '',
      error: null,
    };
  }

  componentDidMount = () => {
    this.setState({ msg: '' });
    this.setState({ error: null });
  };

  componentWillReceiveProps = async (nextProps) => {
    //console.log(nextProps.isLink, this.props.isLink);
    if (nextProps.isLink !== this.props.isLink) {
      this.setState({ error: null });

      if (nextProps.isLinkDeviceCodeValid == true) {
        this.setState({ msg: 'Link Device successfully' });
        Alert.alert('', I18n.t('FIRST_STEP_REGESTER.CodeSuc'));
        if (nextProps.deviceTypeId == Constants.DeviceType.shared) {
          this.props.sharedDevice(true);
        }
        this.props.back();
        this.props.onChangeDevice();
        this.props.getId(false);
      } else if (nextProps.isLinkDeviceCodeValid == false) {
        Alert.alert('', I18n.t('FIRST_STEP_REGESTER.CodeError'));
        this.setState({ error: I18n.t('FIRST_STEP_REGESTER.CodeError') });
        this.props.getId(false);
      }
    }
  };
  otp = (i) => {
    var otpValue = i;
    var otpNo =
      otpValue[0] +
      otpValue[1] +
      otpValue[2] +
      otpValue[3] +
      otpValue[4] +
      otpValue[5];

    if (otpNo.length == 6 && this.state.otp == null) {
      this.setState({ otp: Platform.OS == 'ios' ? i : otpNo });
    }
  };
  submit = () => {
    this.setState({ error: '' });
    if (this.state.otp && this.state.otp.length == 6) {
      this.props.linkDeviceWithCode(
        this.props.uniqueId,
        Platform.OS == 'ios' ? this.state.otp.join('') : this.state.otp
      );
    } else {
      this.setState({ error: I18n.t('FIRST_STEP_REGESTER.CodeWrong') });
    }
  };
  render() {
    return (
      <>
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              //    marginTop: Platform.OS == "android" ? 100 : 0,
            }}>
            <Image source={Images.logoHeaderWezara} style={styles.img} />
            <Text style={styles.txtSilver}>
              {I18n.t('FIRST_STEP_REGESTER.EnterDivice')}
            </Text>
            <View
              style={{
                width: '87%',
                alignSelf: 'center',
                marginTop: width > 600 ? 20 : 0,
              }}>
              <OTPTextInput
                onChange={(i) => {
                  this.otp(i);
                }}
                offTintColor={this.state.error ? 'red' : '#0877D0'}
                error={this.state.error}
                inputCount={6}
                code={true}
              />
              {this.state.msg && this.state.msg.length > 0 ? (
                <Text
                  style={{ marginLeft: '10%', marginTop: 8, color: 'green' }}>
                  {this.state.msg}
                </Text>
              ) : (
                <></>
              )}
              {this.state.error && this.state.error.length > 0 ? (
                <Text
                  style={{
                    marginTop: 12,
                    color: 'red',
                    marginHorizontal: 10,
                    textAlign: Platform.OS == 'ios' ? 'left' : 'auto',
                  }}>
                  {this.state.error}
                </Text>
              ) : (
                <></>
              )}
            </View>
            <Text style={styles.underOtp}>
              {I18n.t('SECEND_STEP_REGISTER.LinkDeviceDescription')}
            </Text>
            <View
              style={{
                width: '87%',
                alignSelf: 'center',
                marginTop: width > 600 ? 75 : 25,
                height: 150,
              }}>
              <ButtonSubmit
                title={I18n.t('Common.Submit')}
                onPress={() => {
                  this.submit();
                }}
                isLoading={this.props.isFetch}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
}
const mapStateToProps = ({ register }) => ({
  isLoading: register.isLoading,
  flagImei: register.flagImei,
  isLinkDeviceCodeValid: register.isLinkDeviceCodeValid,
  deviceTypeId: register.deviceTypeId,
  error: register.error,
  isLink: register.isLink,
});
function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;
  const RegisterRedux = require('@redux/RegisterRedux');
  return {
    ...ownProps,
    ...stateProps,
    checkNationalNoDeviceId: (nationalNo, password, uniqueId) => {
      RegisterRedux.actions.checkNationalNoDeviceId(
        dispatch,
        nationalNo,
        password,
        uniqueId
      );
    },
    linkDeviceWithCode: (uniqueId, code) => {
      RegisterRedux.actions.linkDeviceWithCode(dispatch, uniqueId, code);
    },
  };
}
export default connect(mapStateToProps, null, mergeProps)(GetDeviceId);
