import React from "react";

import { View, Dimensions, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RegisterScreen from "./RegisterScreen";
import SanadVerification from "../containers/SanadVerification";

import NavigationTheme from "./NavigationTheme";
import HomeScreen from "./HomeScreen";
import LoginScreen from "./LoginScreen";
import PdfScreen from "./PdfScreen";
import ResolutionScreen from "./ResolutionScreen";
import ProfileScreen from "./ProfileScreen";
import { Invitations, Resolution } from "@images/svg";
import I18n from "@i18n";
import AuthLoadingScreen from "./AuthLoadingScreen";
import SharedDeviceScreen from "./SharedDeviceScreen";
import { UserService } from "@services";
import { store } from "@store/configureStore";
import Notifications from "../containers/Notifications";

const AuthStack = createNativeStackNavigator();
const config = {
  screens: {
    SignUp: "verify:/code",
  },
};

const linking = {
  prefixes: ["http://updawn.us", "updawn://"],
  config,
};

const Login = createNativeStackNavigator();
const LoginStackNavigator = ({ route, navigation }) => {
  return (
    <Login.Navigator
      initialRouteName="AuthLoading"
      screenOptions={{
        headerShown: false,
        headerLeft: null,
        headerTintColor: "black",
        headerStyle: {
          backgroundColor: "#000",
        },
        gesturesEnabled: false,
        mode: "modal",
      }}
    >
      <Login.Screen
        name="AuthLoading"
        component={AuthLoadingScreen}
        options={AuthLoadingScreen.navigationOptions}
      />
      <Login.Screen
        name="Register"
        component={RegisterScreen}
        options={RegisterScreen.navigationOptions}
      />
      <Login.Screen
        name="SharedDevice"
        component={SharedDeviceScreen}
        options={RegisterScreen.navigationOptions}
      />
      <Login.Screen
        name="SanadVerification"
        component={SanadVerification}
        options={RegisterScreen.navigationOptions}
      />
      <Login.Screen
        name="Home"
        component={BottomTab}
        options={HomeScreen.navigationOptions}
      />
      <Login.Screen
        name="Profile"
        component={ProfileScreen}
        options={ProfileScreen.navigationOptions}
      />
      <Login.Screen
        name="Login"
        component={LoginScreen}
        options={LoginScreen.navigationOptions}
      />
      <Login.Screen
        name="Pdf"
        component={PdfScreen}
        options={PdfScreen.navigationOptions}
      />
      <Login.Screen name="Notifications" component={Notifications} />
    </Login.Navigator>
  );
};

const Tab = createBottomTabNavigator();
const BottomTab = ({ route, navigation }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopWidth: 2.5,
          borderRightWidth: 2.5,
          borderColor: "#e6e6e6",
          alignSelf: "center",
          elevation: 0,
          width: "100%",
          height: 75,
        },
        gesturesEnabled: false,
        tabBarHideOnKeyboard: true,
      }}
      activeColor="#0000000"
      inactiveColor="#000000"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "#0877D0",
          tabBarLabelStyle: {
            fontFamily: "DINNextLTArabic-Regular",
            fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
            paddingTop: Dimensions.get("window").width > 700 ? 5 : 0,
            paddingBottom: 10,
            paddingHorizontal: Dimensions.get("window").width > 700 ? 20 : 14,
          },
          tabBarLabel: I18n.t("Common.Invitations"),
          tabBarIcon: (props) => (
            <View
              style={{
                paddingTop: Dimensions.get("window").width > 600 ? 0 : 9,
              }}
            >
              <Resolution focus={props.focused} />
            </View>
          ),
        }}
      />
      {showResolution() && (
        <Tab.Screen
          name="Resolution"
          component={ResolutionScreen}
          options={{
            unmountOnBlur: true,
            headerShown: false,
            tabBarActiveTintColor: "white",
            tabBarActiveBackgroundColor: "#0877D0",
            tabBarLabelStyle: {
              fontFamily: "DINNextLTArabic-Regular",
              fontSize: Dimensions.get("window").width > 600 ? 18 : 14,
              paddingTop: Dimensions.get("window").width > 700 ? 5 : 0,
              paddingBottom: 10,
              paddingHorizontal: Dimensions.get("window").width > 700 ? 20 : 14,
            },
            tabBarLabel: I18n.t("Common.Resolutions"),
            tabBarIcon: (props) => (
              <View
                style={{
                  // position: "absolute",
                  // zIndex: 1,
                  fontSize: 18,
                  // alignSelf: "center",
                  paddingTop: Dimensions.get("window").width > 600 ? 0 : 9,
                  // paddingTop: 37,
                }}
              >
                <Invitations focus={props.focused} />
              </View>
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};
const AuthAppStack = createNativeStackNavigator();
const AuthAppStackNavigator = () => {
  return (
    <AuthAppStack.Navigator
      initialRouteName="AuthLoading"
      screenOptions={{ gestureEnabled: false, headerShown: false }}
    >
      {/* <AuthAppStack.Screen name="AuthLoading" component={AuthLoadingScreen} /> */}
      <AuthAppStack.Screen name="Login" component={LoginStackNavigator} />

      {/* <AuthAppStack.Screen name="App" component={BottomTab} /> */}
    </AuthAppStack.Navigator>
  );
};

const showResolution = () => {
  var invitationViewOnly = store.getState().register.invitationViewOnly;
  return invitationViewOnly == "true" ? false : true;
};

// const Stack = createNativeStackNavigator();
export default class AppNavigator extends React.PureComponent {
  render() {
    return (
      <SafeAreaProvider>
        <NavigationContainer linking={linking} theme={NavigationTheme}>
          <AuthAppStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}
