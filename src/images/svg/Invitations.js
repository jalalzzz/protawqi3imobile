import Svg, { Path, G } from "react-native-svg";

/* Use this if you are using Expo
  import * as Svg from 'react-native-svg';
  const { Circle, Rect } = Svg;
  */

import React from "react";
import { View, StyleSheet } from "react-native";

export default class Clear extends React.Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        viewBox="0 0 18.644 21.583"
      >
        <G
          id="Group_1986"
          data-name="Group 1986"
          transform="translate(-265.5 -729.5)"
        >
          <G id="documents-outline" transform="translate(261.5 727.75)">
            <Path
              id="Path_1778"
              data-name="Path 1778"
              d="M17,15.255v7.9a1.992,1.992,0,0,1-1.973,2.022H6.475A1.993,1.993,0,0,1,4.5,23.151V11.022A2.034,2.034,0,0,1,6.522,9h4.324a1.128,1.128,0,0,1,.8.338l5.015,5.1a1.167,1.167,0,0,1,.333.816Z"
              transform="translate(0 -2.339)"
              fill="none"
              stroke={this.props.focus ? "white" : "silver"}
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <Path
              id="Path_1779"
              data-name="Path 1779"
              d="M14.063,9v4.962a1.3,1.3,0,0,0,1.287,1.287h4.962"
              transform="translate(-3.314 -2.339)"
              fill="none"
              stroke={this.props.focus ? "white" : "silver"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <Path
              id="Path_1780"
              data-name="Path 1780"
              d="M12.375,6.661V4.272A2.034,2.034,0,0,1,14.4,2.25h4.319a1.141,1.141,0,0,1,.809.338l5.015,5.1a1.153,1.153,0,0,1,.333.81v7.9A1.992,1.992,0,0,1,22.9,18.423h-2.8"
              transform="translate(-2.729)"
              fill="none"
              stroke={this.props.focus ? "white" : "silver"}
              strokeLinejoin="round"
              strokeWidth="1"
            />
            <Path
              id="Path_1781"
              data-name="Path 1781"
              d="M21.938,2.25V7.212A1.3,1.3,0,0,0,23.225,8.5h4.962"
              transform="translate(-6.043 0)"
              fill="none"
              stroke={this.props.focus ? "white" : "silver"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
            />
          </G>
        </G>
      </Svg>
    );
  }
}
