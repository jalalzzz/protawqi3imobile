import Svg, { G, Path, Ellipse } from "react-native-svg";

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default class Sign extends React.Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={74}
        height={73}
        viewBox="0 0 74 73"
      >
        <G data-name="Group 1" transform="translate(-159 -339)">
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
            data-name="Icon awesome-feather-alt"
            d="M36 0C32.359.25 6.781 2.686 4.993 20.223a78.312 78.312 0 00-.421 5.642L17.149 13.3a1.126 1.126 0 011.593 1.591L.5 33.119a1.688 1.688 0 002.389 2.386L6.9 31.493a79.481 79.481 0 008.857-.518A16.774 16.774 0 0025.08 27h-7.1l10.32-3.437a27.9 27.9 0 002.141-3.313h-5.702l7.491-3.741A57.39 57.39 0 0036 0z"
            transform="translate(180 357.5)"
            fill="#0877d0"
          />
        </G>
      </Svg>
    );
  }
}
