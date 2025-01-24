/** @format */
import { DefaultTheme, DarkTheme } from "react-native-paper";

const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: "rgba(255, 255, 255, 0.9)",
    primary: "#475E92",
    accent: "yellow",
    lineColor: "#383A46",
    background: "#222229", // '#242424' // '#232D4C'
  },
};

const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    //primary: "#475E92",
    lineColor: "#ffffff",
    background: "#ffffff",
    //accent: "yellow",
  },
};

export default { dark, light };
