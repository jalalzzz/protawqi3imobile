import AsyncStorage from '@react-native-async-storage/async-storage';

const key = 'signUpModel';

const storeModel = async model => {
  try {
    await AsyncStorage.setItemAsync(key, JSON.stringify(model));
  } catch (error) {}
};

const getModel = async () => {
  try {
    var model = await AsyncStorage.getItemAsync(key);
    return JSON.parse(model);
  } catch (error) {
    alert('Error getting the auth token', error);
  }
};

const removeModel = async () => {
  try {
    await AsyncStorage.deleteItemAsync(key);
  } catch (error) {
    //console.log("Error removing the auth token", error);
  }
};

export default {getModel, removeModel, storeModel};
