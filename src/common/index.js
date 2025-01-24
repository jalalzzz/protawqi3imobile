import { I18nManager } from "react-native";

import _Color from "./Color";
import _Config from "./Config";
import _Constants from "./Constants";
import _Device from "./Device";
// import _Icons from "./Icons";
import _Images from "./Images";
import _Styles from "./Styles";
import _Theme from "./Theme";
import _Tools from "./Tools";
// import _RootNavigation from "./RootNavigation";
import _Validator from "./Validator";
import _LanguageDefualt from "./LanguagesEn";
import _LanguageAr from "./LanguagesAr";
const isRtl = () => {
  // var isFirstRun = await AsyncStorage.getItem("isFirstRun");
  // if (typeof isFirstRun != "undefined" && !isFirstRun) {
  return I18nManager.isRTL ? _LanguageAr : _LanguageDefualt;
  // }
  // return true;
};
export const Color = _Color;
export const Config = _Config;
export const Constants = _Constants;
export const Device = _Device;
// export const Icons = _Icons;
export const Images = _Images;
export const Languages = isRtl();
export const Styles = _Styles;
export const Theme = _Theme;
export const Tools = _Tools;
// export const RootNavigation = _RootNavigation;
export const Validator = _Validator;
