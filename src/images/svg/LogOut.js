import Svg, { Path, G } from "react-native-svg";

/* Use this if you are using Expo
  import * as Svg from 'react-native-svg';
  const { Circle, Rect } = Svg;
  */

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default class Clear extends React.Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={Dimensions.get("window").width > 700 ? "25.927" : "18.927"}
        height={Dimensions.get("window").width > 700 ? "25.927" : "18.927"}
        viewBox="0 0 18.927 18.864"
      >
        <G id="Group_186" dataName="Group 186" transform="translate(0)">
          <Path
            id="Path_160"
            dataName="Path 160"
            d="M821.574,2205.374H814.5a.786.786,0,0,1-.786-.786v-14.148a.786.786,0,0,1,.786-.786h7.074a.786.786,0,1,0,0-1.572H814.5a2.361,2.361,0,0,0-2.358,2.358v14.148a2.361,2.361,0,0,0,2.358,2.358h7.074a.786.786,0,1,0,0-1.572Z"
            transform="translate(-812.142 -2188.081)"
            fill="#fff"
          />
          <Path
            id="Path_161"
            dataName="Path 161"
            d="M832.744,2206.873l4.779,4.716a.786.786,0,0,0,1.1-1.119l-3.415-3.37h9.152a.786.786,0,1,0,0-1.572h-9.152l3.415-3.37a.786.786,0,1,0-1.1-1.12l-4.779,4.716a.786.786,0,0,0,0,1.12Z"
            transform="translate(-826.222 -2196.881)"
            fill="#fff"
          />
        </G>
      </Svg>
    );
  }
}
