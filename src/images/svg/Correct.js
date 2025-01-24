import Svg, { G, Path, Ellipse } from "react-native-svg";

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default class Correct extends React.Component {
  render() {
    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width={74} height={73}>
        <G data-name="Group 4" transform="translate(-159 -339)">
          <Ellipse
            data-name="Ellipse 19"
            cx={37}
            cy={36.5}
            rx={37}
            ry={36.5}
            transform="translate(159 339)"
            fill="#fff"
          />
          <Path
            data-name="Path 11674"
            d="m178.924 377.511 11.39 14.351 25.685-29.472"
            fill="none"
            stroke="#34c759"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={4.99935}
          />
        </G>
      </Svg>
    );
  }
}
