import { Constants } from "@common";
import React, { PureComponent } from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ActivityIndicator,

} from "react-native";
import { Entypo,Ionicons,MaterialCommunityIcons} from "@expo/vector-icons";

import { connect } from "react-redux";
import styles from "./styles";


class ChangeTextInput extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
  
render(){
    return(
        <View style={styles.rowInput}>
          {this.props.index==1 ?
        
        <Entypo name="lock" size={20} color="silver" style={styles.icon} />
        :
        this.props.index ==2?
        <MaterialCommunityIcons name="office-building" size={20} color="silver"  style={styles.icon}/>
        :
        <Ionicons
              name="person"
              size={20}
              color="silver"
              style={styles.icon}
            />
          }
              <TextInput
                ref={this.props.ref}
                style={[
                  styles.txtInput,
                  {
                    borderColor:this.props.borderColor,
                    borderWidth:1.5,
                  },
                ]}
                onChangeText={this.props.change}
                placeholder={this.props.placeholder}
                secureTextEntry={this.props.index==1?true:false}
              />
            </View>
    )
}


}



const mapStateToProps = ({}) => ({

  });
  function mergeProps(stateProps, dispatchProps, ownProps) {
    const { dispatch } = dispatchProps;
    const Loads = require("@redux/Loads");
    const ImagesRedux = require("@redux/ImagesRedux");
    return {
      ...ownProps,
      ...stateProps,
    };
  }
  export default connect(mapStateToProps, null, mergeProps)(ChangeTextInput);