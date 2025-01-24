import { Constants, Images } from "@common";
import { ButtonSubmit } from "@components";
import { connect } from "react-redux";
import React, { PureComponent } from "react";
import Otp from './Otp';


import {
  View,
  Dimensions,
  Text,
  Image,
  TextInput
} from "react-native";
import styles from "./styles";
const { width, height } = Dimensions.get("window");
export default class Otps extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      nationalNo:null,
      valid:false
    };
  }

  componentDidMount = async () => {};

  componentWillReceiveProps = async (nextProps) => {
  
  }
  
  render() {
return(
    <View>
 
    </View>
)
  }
}