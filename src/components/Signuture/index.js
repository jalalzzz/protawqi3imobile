import React, { PureComponent } from "react";

import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import I18n from "@i18n";
import SignatureCapture from "react-native-signature-capture";
import { Clear } from "@images/svg";
import { Languages } from "@common";
import SignatureScreen from "react-native-signature-canvas";

export default class Signuture extends PureComponent {
  constructor(props) {
    super(props);
    // this.state={
    //  color:
    // }
    this.ref = React.createRef();
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.ref.current.changePenSize(2.5, 3.5);
      //this.ref.current.changePenSize(2.5, 3);
    }, 100);
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.color !== this.props.color) {
      //alert(nextProps.color)
      this.setState({ color: nextProps.color });
      this.ref.current.changePenColor(nextProps.color);
      // this.ref.current.changePenSize(minW, maxW)
      //this.ref.current.readSignature();
    }
    if (nextProps.pen !== this.props.pen) {
      // if (nextProps.pen == 0) {
      //   this.ref.current.changePenSize(2, 1.5);
      // } else {
      //this.ref.current.changePenSize(3, 2.5);
      //}
    }
  }
  _onDragEvent = () => {
    sign.current.saveImage();
  };

  // Called after ref.current.readSignature() reads a non-empty base64 string
  handleOK = (signature) => {
    this.props.nextStep(signature.replace("data:image/png;base64,", ""));
  };
  // Called after ref.current.readSignature() reads an empty string
  handleEmpty = () => {
    // this.ref.current.clearSignature()
    this.props.nextStep(null);
  };

  // Called after ref.current.clearSignature()
  handleClear = () => {
    this.ref.current.undo();
    this.props.nextStep(null);
    this.ref.current.undo();
  };

  // Called after end of stroke
  handleEnd = () => {
    this.ref.current.readSignature();
  };

  // Called after ref.current.getData()
  handleData = (data) => {};

  render() {
    return (
      <>
        <TouchableOpacity
          style={{
            width: "90%",
            alignSelf: "center",
            marginBottom: "2%",
            flexDirection: "row",
          }}
          onPress={() => {
            this.handleClear();
          }}>
          <Clear />
          <Text
            style={{
              color: "#0877D0",
              fontWeight: "600",
              marginLeft: "1%",
              fontFamily: "DINNextLTArabic-Regular",
            }}>
            {I18n.t("THIRD_STEP_REGISTER.EarseSign")}
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            height: this.props.height,
          }}>
          <SignatureScreen
            ref={this.ref}
            onEnd={this.handleEnd}
            onOK={this.handleOK}
            //onChangePenColor={  }
            onEmpty={this.handleEmpty}
            onClear={this.handleClear}
            onGetData={this.handleData}
            autoClear={false}
            descriptionText={"text"}
            penColor={this.props.color}
            bgHeight={this.props.height}
            minWidth={4}
            overlayHeight={this.props.height}
            style={{
              width: "90%",
              alignSelf: "center",
              height: 30,
              borderWidth: 1,
              borderStyle: "dashed",
            }}
            //backgroundColor={"white"}
            webStyle={`
            body,html {
              height: ${this.props.height}px;
            }
            .m-signature-pad--footer
            .button {
              background-color: white;
              color: #FFF;
            }
            .m-signature-pad {
              border: none !important;
              box-shadow: none ;
              top: 0;
  left: 0;
  width: 100%;
  height: 100%;
            }
            .m-signature-pad:before, .m-signature-pad:after, .m-signature-pad--body
            {
              border: none !important;
              box-shadow: none ;
              left:${Dimensions.get("window").width > 700 ? "-60px" : "-30"} ;
              right: 0;
              top: -60px;
              bottom: 0;
            }
            .m-signature-pad:after {
              left: 0;
              right: 20px;
              -webkit-transform: skew(3deg) rotate(3deg);
              -moz-transform: skew(3deg) rotate(3deg);
              -ms-transform: skew(3deg) rotate(3deg);
              -o-transform: skew(3deg) rotate(3deg);
              transform: skew(3deg) rotate(3deg);
            }
           `}
          />
        </View>
      </>
    );
  }
}

//   return (

//   );
// };
// export default App;
// const styles = StyleSheet.create({
//   signature: {
//     flex: 1,
//     borderColor: "#000033",
//     borderWidth: 2,
//   },
//   buttonStyle: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     height: 50,
//     backgroundColor: "#eeeeee",
//     margin: 10,
//   },
// });
