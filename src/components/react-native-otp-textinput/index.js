import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flexDirection: Platform.OS == 'ios' ? 'row-reverse' : 'row',
    justifyContent: 'space-around',
    marginTop: '10%',
    // width: Dimensions.get("window").width < 700 ? "100%" : "100%",
    alignSelf: 'center',
    // marginHorizontal: "30%",
  },
  textInput: {
    height: 75,
    //borderBottomWidth: 1,
    fontSize: 22,
    fontWeight: '500',
    color: '#000000',
    fontFamily: 'DINNextLTArabic-Regular',
    marginLeft: width < 700 ? 5 : 5,
    textAlign: 'center',
    marginRight: width < 700 ? 5 : 5,
    borderWidth: 1,
  },
});

const getOTPTextChucks = (inputCount, inputCellLength, text) => {
  let otpText =
    text.match(new RegExp('.{1,' + inputCellLength + '}', 'g')) || [];

  otpText = otpText.slice(0, inputCount);

  return otpText;
};

class OTPTextView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: 0,
      otpText: getOTPTextChucks(
        props.inputCount,
        props.inputCellLength,
        props.defaultValue
      ),
    };

    this.inputs = [];
  }

  basicValidation = (text) => {
    const validText = /^[0-9a-zA-Z]+$/;
    return text.match(validText);
  };

  onTextChange = (text, i) => {
    const { inputCellLength, inputCount, handleTextChange } = this.props;
    if (text && !this.basicValidation(text)) {
      return;
    }

    this.setState(
      (prevState) => {
        let { otpText } = prevState;

        otpText[i] = text;

        return {
          otpText,
        };
      },
      () => {
        handleTextChange(this.state.otpText.join(''));

        if (text.length === inputCellLength && i !== inputCount - 1) {
          this.inputs[i + 1].focus();
        }
      }
    );
  };

  onInputFocus = (i) => {
    const { otpText } = this.state;

    const prevIndex = i - 1;

    if (prevIndex > -1 && !otpText[prevIndex] && !otpText.join('')) {
      this.inputs[prevIndex].focus();
      return;
    }

    this.setState({ focusedInput: i });
  };

  onKeyPress = (e, i) => {
    const val = this.state.otpText[i] || '';

    if (e.nativeEvent.key === 'Backspace' && i !== 0 && !val.length) {
      this.inputs[i - 1].focus();
    }
  };

  clear = () => {
    this.setState(
      {
        otpText: [],
      },
      () => {
        this.inputs[0].focus();
        this.props.handleTextChange('');
      }
    );
  };

  setValue = (value) => {
    const { inputCount, inputCellLength } = this.props;

    const updatedFocusInput = value.length - 1;

    this.setState(
      {
        otpText: getOTPTextChucks(inputCount, inputCellLength, value),
      },
      () => {
        if (this.inputs[updatedFocusInput]) {
          this.inputs[updatedFocusInput].focus();
        }
        this.props.handleTextChange(value);
      }
    );
  };

  render() {
    const {
      inputCount,
      offTintColor,
      tintColor,
      defaultValue,
      inputCellLength,
      containerStyle,
      textInputStyle,
      keyboardType,
      ...textInputProps
    } = this.props;

    const { focusedInput, otpText } = this.state;
    this.props.onChange(otpText);

    const TextInputs = [];

    for (let i = 0; i < inputCount; i += 1) {
      const inputStyle = [
        styles.textInput,
        textInputStyle,

        {
          borderColor: offTintColor,
          width: this.props.code
            ? Dimensions.get('window').width < 700
              ? 50
              : 100
            : 75,
          height: this.props.code
            ? Dimensions.get('window').width < 700
              ? 65
              : 100
            : 75,
        },
      ];

      //   console.log(this.props.otp);

      TextInputs.push(
        <View
          style={{
            borderColor: this.props.error ? 'red' : '#0877D0',
          }}>
          <TextInput
            ref={(e) => {
              this.inputs[i] = e;
            }}
            key={i}
            autoCorrect={false}
            keyboardType={keyboardType}
            autoFocus={false}
            secureTextEntry={true}
            value={
              this.props.otp ? otpText[i] : otpText[i] ? otpText[i] : '' || ''
            }
            style={inputStyle}
            maxLength={this.props.inputCellLength}
            onFocus={() => this.onInputFocus(i)}
            onChangeText={(text) => this.onTextChange(text, i)}
            multiline={false}
            onKeyPress={(e) => this.onKeyPress(e, i)}
            {...textInputProps}
          />
        </View>
      );
    }

    return (
      <View
        style={[
          styles.container,
          containerStyle,
          {
            marginRight: this.props.code
              ? Dimensions.get('window').width < 700
                ? 100
                : 200
              : Dimensions.get('window').width < 700
              ? -10
              : -100,
            width:
              Dimensions.get('window').width < 700
                ? '100%'
                : this.props.secend
                ? '60%'
                : '100%',
            marginHorizontal: this.props.secend
              ? width > 600
                ? -100
                : 0
              : '30%',
          },
        ]}>
        {TextInputs}
      </View>
    );
  }
}

OTPTextView.propTypes = {
  defaultValue: PropTypes.string,
  inputCount: PropTypes.number,
  containerStyle: PropTypes.any,
  textInputStyle: PropTypes.any,
  inputCellLength: PropTypes.number,
  tintColor: PropTypes.string,
  offTintColor: PropTypes.string,
  handleTextChange: PropTypes.func,
  inputType: PropTypes.string,
  keyboardType: PropTypes.string,
};

OTPTextView.defaultProps = {
  defaultValue: '',
  inputCount: 4,
  tintColor: '#0877D0',
  offTintColor: '#DCDCDC',
  inputCellLength: 1,
  containerStyle: {},
  textInputStyle: {},
  handleTextChange: () => {},
  keyboardType: 'numeric',
};

export default OTPTextView;
