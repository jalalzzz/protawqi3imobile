import { DefaultTheme } from "@react-navigation/native";
import { Color } from "@common";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
    background: Color.white,
  },
};
