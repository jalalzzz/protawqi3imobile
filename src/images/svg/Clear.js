import Svg, { Path } from "react-native-svg";

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
        width="15.126"
        height="30"
        viewBox="0 0 15.126 13.235"
      >
        <Path
          id="Icon_awesome-eraser"
          data-name="Icon awesome-eraser"
          d="M14.711,9.4a1.418,1.418,0,0,0,0-2.005L9.984,2.665a1.418,1.418,0,0,0-2.005,0L.415,10.228a1.418,1.418,0,0,0,0,2.005L3.251,15.07a1.418,1.418,0,0,0,1,.415H14.772a.355.355,0,0,0,.355-.355V13.949a.355.355,0,0,0-.355-.355H10.514l4.2-4.2ZM5.77,7.548l4.058,4.058L7.84,13.595H4.45L2.087,11.231Z"
          transform="translate(0 -2.25)"
          fill="#0877d0"
        />
      </Svg>
    );
  }
}
