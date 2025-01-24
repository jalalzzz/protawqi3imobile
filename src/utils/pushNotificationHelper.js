import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log("Authorization status:", authStatus);
  }
}

async function GetFMCToken() {
  let fmcToken = await AsyncStorage.getItem('fmcToken');
  try {
    if (!fmcToken) {
      let fmcToken = messaging().getToken();
      if (fmcToken) {
        AsyncStorage.setItem('fmcToken', fmcToken);
      } else {
      }
    }
  } catch (error) {
    //console.log(error, "error in fmc Token ");
  }
}
