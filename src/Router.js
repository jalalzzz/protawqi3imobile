import { connect } from "react-redux";
import Navigation from "@navigation";
// import {store} from '@store/configureStore';
// import NetInfo from '@react-native-community/netinfo';
import { ThemeProvider } from "react-native-paper";
import { Theme } from "@common";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  I18nManager,
  SafeAreaView,
  Text,
  Animated,
  Platform,
  Dimensions,
  Alert,
} from "react-native";
import { store } from "@store/configureStore";
import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import dings from "../notification.mp3";
import NetInfo from "@react-native-community/netinfo";
import DeviceInfo from "react-native-device-info";
import { IpChanged, Tools } from "@components";
import GetLocation from "react-native-get-location";
import AuthTokenStorage from "@store/AuthTokenStorage";
import publicIP from "react-native-public-ip";

const { width, height } = Dimensions.get("window");
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
I18nManager.swapLeftAndRightInRTL(false);
console.disableYellowBox = true;

var Sound = require("react-native-sound");

Sound.setCategory("Playback");
var ding = new Sound(dings);

const Router = (props) => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [msg, setMsg] = useState(null);
  const [ip, setIp] = useState(null);
  const [ipMatch, setIpNotMatch] = useState(true);
  let deviceId = DeviceInfo.getUniqueId();

  useEffect(() => {
    getIP();
    getCurrentLocation();
    requestUserPermission();
    notificationListner();
    netListner();
    //
    ding.setVolume(1);
    return () => {
      ding.release();
    };
  }, []);

  const getCurrentLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        if (location) {
          props.updateLocation(location.longitude, location.latitude);
        }
      })
      .catch((error) => {
        props.updateLocation(null, null);
      });
  };

  const getIP = () => {
    publicIP()
      .then((ip) => {
        setIp(ip);
      })
      .catch((error) => {
        console.log(error);
        // 'Unable to get IP address.'
      });
    props.checkDeviceLink(deviceId);
  };

  const playPause = () => {
    ding.play((success) => {
      if (success) {
        // console.log('successfully finished playing');
      } else {
        //  console.log('playback failed due to audio decoding errors');
      }
    });
  };
  const showPopup = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2500,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 2500,
      }).start();
      setMsg(null);
    }, 5000);
  };
  const handelLogout = async () => {
    await props.logout(deviceId);
    await AuthTokenStorage.removeToken();
    props.navigation.navigate("AuthLoading", {
      reset: true,
    });
  };
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      GetFMCToken();
    }
  };
  const GetFMCToken = async () => {
    let fmcToken = await AsyncStorage.getItem("fmcToken");
    try {
      if (!fmcToken) {
        await messaging()
          .getToken(firebase.app().options.messagingSenderId)
          .then((fmcToken) => AsyncStorage.setItem("fmcToken", fmcToken))
          .catch((e) => console.log(e));
      }
    } catch (error) {
      // console.log(error, 'error in FMC Token ');
    }
  };

  const notificationListner = () => {
    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification
      // );
    });

    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
        }
      });
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      //console.log('Message handled in the background!', remoteMessage);
    });
    messaging().onMessage(async (remoteMessage) => {
      // console.log('Message handled in the background!', remoteMessage);

      switch (remoteMessage?.data?.code) {
        case "DEVICE_LOGOUT":
          Alert.alert(
            remoteMessage.notification.title,
            remoteMessage.notification.body,
            [{ text: "OK", onPress: () => handelLogout() }]
          );
          break;
        default:
          setMsg(
            `${remoteMessage.notification.body} : ${remoteMessage.notification.title}`
          );
          {
            Platform.OS == "android" && playPause();
            showPopup();
          }

          props.ResolutionPdf();
          props.InvitationPdf();
          props.GetAllNotifications();
      }
    });
  };

  const netListner = () => {
    NetInfo.fetch().then((state) => {
      // console.log('Connection type', state.type);
      // console.log('Is connected?', state.isConnected);
      props.updateConnectionStatus(state.isConnected, state.type);
      getIP();
    });
  };

  const theme = Theme.light;

  return (
    <ThemeProvider theme={theme} style={{}}>
      {ip == props.staticIP || !props.staticIP ? (
        <Navigation />
      ) : (
        <IpChanged
          onRefreshHandler={() => {
            getIP();
          }}
        />
      )}

      {msg ? (
        <Animated.View
          style={{
            zIndex: !msg
              ? 100000
              : Platform.OS != "android"
              ? 100000
              : -1000000,
            backgroundColor: "#59b300",
            height: Platform.OS == "android" ? 100 : 100,
            width: "100%",
            alignSelf: "center",
            marginBottom: 50,
            position: "absolute",
            top: 0,
            opacity: Platform.OS == "android" ? fadeAnim : 1,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              paddingTop: 22,
              fontSize: width < 650 ? 15 : 22,
              fontFamily: "DINNextLTArabic-Regular",
              color: "white",
            }}
          >
            {msg && (
              <Entypo
                name="bell"
                size={24}
                style={{
                  color: "white",
                  alignSelf: "center",
                  marginLeft: 0,
                }}
              />
            )}
            {msg}
          </Text>
        </Animated.View>
      ) : (
        <></>
      )}
    </ThemeProvider>
  );
};

const mapStateToProps = ({ netInfo, register }) => ({
  //netInfo: state.netInfo,
  isConnected: netInfo.isConnected,
  connectedType: netInfo.connectedType,
  staticIP: register.staticIP,
});

const mapDispatchToProps = (dispatch) => {
  const netInfoRedux = require("@redux/NetInfoRedux");
  const ResolutionRedux = require("@redux/ResolutionRedux");
  const InvitationRedux = require("@redux/InvitationRedux");
  const RegisterRedux = require("@redux/RegisterRedux");
  const LocationRedux = require("@redux/LocationRedux");
  const pushNotificationsRedux = require("@redux/PushNotificationsRedux");

  return {
    updateConnectionStatus: (isConnected) => {
      netInfoRedux.actions.updateConnectionStatus(dispatch, isConnected, type);
    },
    ResolutionPdf: () => {
      ResolutionRedux.actions.ResolutionPdf(dispatch);
    },
    InvitationPdf: () => {
      InvitationRedux.actions.InvitationPdf(dispatch);
    },
    GetAllNotifications: () => {
      pushNotificationsRedux.actions.GetAllNotifications(dispatch, 0);
    },
    checkDeviceLink: (deviceId) => {
      RegisterRedux.actions.checkDeviceLink(dispatch, deviceId);
    },

    logout: (deviceId) => {
      RegisterRedux.actions.logout(dispatch, deviceId);
    },
    updateLocation: (longitude, latitude) => {
      LocationRedux.actions.updateLocation(dispatch, longitude, latitude);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Router);
