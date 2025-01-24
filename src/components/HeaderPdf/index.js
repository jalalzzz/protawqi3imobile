import { Images } from "@common";
import React, { PureComponent } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Tools from "@common/Tools";

class HeaderPdf extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {};
  componentWillReceiveProps = async (nextProps) => {};

  render() {
    return (
      <View
        style={{
          height: 85,
          backgroundColor: "#0877D0",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            position: "relative",
            bottom: -60,
          }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              left: 0,
              marginLeft: 10,
              marginTop: -40,
              padding: 20,
            }}
            onPress={() => {
              this.props.goBack();
            }}
          >
            <AntDesign
              name="left"
              size={24}
              style={{
                color: "white",
                alignSelf: "center",
                marginLeft: 0,
              }}
            />
          </TouchableOpacity>
          <View
            style={{
              color: "white",
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                marginTop: -25,
                fontFamily: "DINNextLTArabic-Regular",
              }}
            >
              {this.props.name &&
                Tools.formatDocSignNameLength(
                  this.props.name,
                  Dimensions.get("window").width
                )}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
const mapStateToProps = ({}) => ({});

function mergeProps(stateProps, dispatchProps, ownProps) {
  const { dispatch } = dispatchProps;

  return {
    ...ownProps,
    ...stateProps,
  };
}
export default connect(mapStateToProps, null, mergeProps)(HeaderPdf);
