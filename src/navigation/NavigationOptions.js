import { Color, Styles, Clients } from "@common";
import { HomeCustomHeader } from "@components";
import { store } from "@store/configureStore";
import {
  Logo,
  Menu,
  NavBarLogo,
  HeaderHomeRight,
  CartWishListIcons,
  TabBarOptionIcon,
  TabBarOptionButton,
  CustomLogo,
} from "./IconNav";

// headerTintColor: Color.headerTintColor,
//       headerStyle,
//       headerTitleStyle: Styles.Common.headerStyle,

// export const getHeaderStyle = () => {
//   const isDark = store.getState().app.isDarkTheme;
//   const background = isDark ? "#222229" : "#ffffff";
//   var headerStyle = Styles.Common.toolbar(background, isDark);
//   return headerStyle;
// };

export const DefualtScreenOptions = {
  headerStyle: {
    height: 100, // Specify the height of your custom header
    backgroundColor: "white",
    zIndex: -100,
    elevation: 0,
  },
  headerTintColor: Color.headerTintColor,
  headerTitleStyle: Styles.Common.headerStyle,
};

export const TabBarOptions = ({
  unmountOnBlur,
  fontType,
  iconName,
  color,
  foucsColor,
  tabBarButtonEnable,
  iconSize,
}) => {
  let options = {};
  options.unmountOnBlur = unmountOnBlur;
  options.tabBarIcon = ({ focused }) => {
    return TabBarOptionIcon(
      fontType,
      color,
      foucsColor,
      iconName,
      focused,
      iconSize
    );
  };
  if (tabBarButtonEnable)
    options.tabBarButton = (props) => {
      return TabBarOptionButton(props);
    };
  return options;
};
