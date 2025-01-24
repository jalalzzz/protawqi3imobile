/** @format */

import React from 'react';
import {
  View,
  Platform,
  Image,
  TouchableOpacity,
  I18nManager,
  Animated,
  Text,
} from 'react-native';
import {isEmpty} from 'lodash';
import {Styles, Events, Images, Config, Color} from '@common';
import {
  NavigationBarIcon,
  CartWishIcons,
  CartIcon,
  TabBarIcon,
  TabBarButton,
} from '@components';
//import { toggleDrawer } from "@app/Omni";
// import { Ionicons } from "@expo/vector-icons";

const NavBarLogo = props => {
  const scrollAnimation =
    props && !isEmpty(props.navigation)
      ? props.navigation.getParam('animatedHeader')
      : new Animated.Value(1);

  return (
    <Animated.Image
      source={Config.LogoImage}
      style={[Styles.Common.logo, {opacity: scrollAnimation}]}
    />
  );
};

const NavBarText = props => {
  const scrollAnimation =
    props && !isEmpty(props.navigation)
      ? props.navigation.getParam('animatedHeader')
      : new Animated.Value(1);

  return (
    <Animated.Text
      style={[Styles.Common.headerText, {opacity: scrollAnimation}]}>
      {props.text}
    </Animated.Text>
  );
};

// Icons for HeaderBar
const Logo = () => (
  <Image source={Config.LogoWithText} style={Styles.Common.logo} />
);

const CustomLogo = () => (
  <Image source={Config.LogoHeaderCustom} style={Styles.Common.customLogo} />
);

const hitSlop = {top: 20, right: 20, bottom: 0, left: 20};

// const Menu = (dark) =>
//   !Config.Layout.HideMenu && (
//     <TouchableOpacity hitSlop={hitSlop} onPress={toggleDrawer}>
//       <Image
//         source={Images.icons.home}
//         style={[
//           Styles.Common.toolbarIcon,
//           dark && { tintColor: "#fff" },
//           I18nManager.isRTL && {
//             transform: [{ rotate: "180deg" }],
//           },
//         ]}
//       />
//     </TouchableOpacity>
//   );

const EmptyView = () => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? {left: -10} : {right: -5},
      Platform.OS !== 'ios' && {right: -12},
    ]}
  />
);

const HeaderRight = navigation => (
  <View
    style={[
      Styles.Common.Row,
      I18nManager.isRTL ? {left: -10} : {right: -5},
      Platform.OS !== 'ios' && {right: -12},
    ]}>
    <NavigationBarIcon
      icon={Images.IconSearch}
      size={17}
      onPress={() => navigation.navigate('Home')}
    />
  </View>
);

const HeaderHomeRight = (navigation, item) => (
  <View style={[Styles.Common.Row, Platform.OS !== 'ios' && {right: -12}]}>
    {!Config.Layout.HideLayoutModal && (
      <NavigationBarIcon
        icon={Images.IconGrid}
        size={17}
        onPress={Events.openModalLayout}
      />
    )}
  </View>
);

const AddProductHeaderIcon = (navigation, dark) => (
  <TouchableOpacity
    hitSlop={hitSlop}
    onPress={() => navigation.navigate('VendorAddProduct')}>
    {/* <Ionicons
      //name={Platform.OS === "android" ? "md-create" : "ios-create"}
      name={"md-add"}
      size={Styles.IconSize.Inline}
      style={[
        Styles.Common.toolbarIcon,
        dark && { color: "#ffffff" },
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    /> */}
  </TouchableOpacity>
);

const CartWishListIcons = navigation => (
  <CartWishIcons navigation={navigation} />
);

const CartIcons = navigation => <CartIcon navigation={navigation} />;

const Back = (navigation, iconBack, dark) => (
  <TouchableOpacity
    style={Styles.Common.viewBack}
    hitSlop={hitSlop}
    onPress={() => {
      navigation.goBack(null);
    }}>
    {/* <Image
      source={iconBack || Images.icons.back}
      style={[
        Styles.Common.toolbarIconBack,
        iconBack && Styles.Common.iconBack,
        dark && { tintColor: "#fff" },
        I18nManager.isRTL && {
          transform: [{ rotate: "180deg" }],
        },
      ]}
    /> */}
  </TouchableOpacity>
);

const RightIcon = (icon, onPress, dark) => (
  <View style={[Styles.Common.Row]}>
    <NavigationBarIcon icon={icon} size={24} onPress={onPress} />
  </View>
);

const Title = (title, textColor) => (
  <View>
    <Text style={[Styles.Common.headerTitleStyle, {color: textColor}]}>
      {title}
    </Text>
  </View>
);
const TabBarOptionIcon = (
  fontType,
  color,
  foucsColor,
  iconName,
  focused,
  iconSize,
) => (
  <TabBarIcon
    fontType={fontType}
    color={focused ? color : foucsColor}
    name={iconName}
    size={iconSize}
  />
);

const TabBarOptionButton = props => <TabBarButton {...props} />;

export {
  Logo,
  CustomLogo,
  //Menu,
  HeaderRight,
  EmptyView,
  CartWishListIcons,
  CartIcons,
  HeaderHomeRight,
  Back,
  NavBarLogo,
  RightIcon,
  NavBarText,
  Title,
  AddProductHeaderIcon,
  TabBarOptionIcon,
  TabBarOptionButton,
};
