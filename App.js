import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import {
  I18nManager,
  SafeAreaView,
  Text,
  Animated,
  View,
  Dimensions,
  Platform,
  StatusBar, 
} from "react-native";
import { store } from "@store/configureStore";
import RootRouter from "./src/Router";
import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Entypo from "react-native-vector-icons/Entypo";
import dings from "./notification.mp3";
import { NetInfo } from "@components";
import DeviceInfo from "react-native-device-info";

const { width, height } = Dimensions.get("window");
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);
I18nManager.swapLeftAndRightInRTL(false);
console.disableYellowBox = true;

const App = () => {
  const [fadeAnim, setFadeAnim] = useState(new Animated.Value(0));
  const [msg, setMsg] = useState("dnfldksnfldksnfldsnlfdes");
  console.log(DeviceInfo.getUniqueId(), "DeviceIDDDD");
  return (
    <Provider store={store}>
      <StatusBar backgroundColor="blue" barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <RootRouter />
        </SafeAreaView>
      </View>
    </Provider>
  );
};

export default App;
