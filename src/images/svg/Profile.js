import Svg, { G, Path } from "react-native-svg";

/* Use this if you are using Expo
  import * as Svg from 'react-native-svg';
  const { Circle, Rect } = Svg;
  */

import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

export default class Profile extends React.Component {
  render() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={Dimensions.get("window").width > 700 ? "25.927" : "18.927"}
        height={Dimensions.get("window").width > 700 ? "25.927" : "18.927"}
        viewBox="0 0 19.087 19.087"
      >
        <G id="Group_198" data-name="Group 198" transform="translate(0 0)">
          <Path
            id="Path_169"
            data-name="Path 169"
            d="M157.91,1425.693a4.507,4.507,0,1,1,4.507-4.507,4.512,4.512,0,0,1-4.507,4.507Zm0-7.425a2.918,2.918,0,1,0,2.917,2.918,2.921,2.921,0,0,0-2.917-2.918Zm0,0"
            transform="translate(-148.366 -1416.68)"
            fill="#fff"
          />
          <Path
            id="Path_170"
            data-name="Path 170"
            d="M156.13,1455.806h-17.5a.793.793,0,0,1-.794-.795,9.6,9.6,0,0,1,2.847-6.856,6.533,6.533,0,0,1,4.581-1.85h4.23a6.527,6.527,0,0,1,4.581,1.85,9.6,9.6,0,0,1,2.847,6.856.793.793,0,0,1-.795.795Zm-16.664-1.59H155.3a7.985,7.985,0,0,0-2.341-4.931,4.938,4.938,0,0,0-3.459-1.386h-4.23a4.931,4.931,0,0,0-3.459,1.386,7.983,7.983,0,0,0-2.341,4.931Zm0,0"
            transform="translate(-137.838 -1436.719)"
            fill="#fff"
          />
        </G>
      </Svg>
    );
  }
}
