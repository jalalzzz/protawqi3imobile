import { ApiClient } from "@services";
import jwtDecode from "jwt-decode";

const checkNationalNoDeviceIdUrl = "AuthApi/CheckNationalNoDeviceId";
const checkDigitalNumberUrl = "AuthApi/CheckDigitalNumber";
const signUpUrl = "AuthApi/SignUp";
const updateSignPictureUrl = "UserApi/UpdateSignPicture";
const checkLinkUrl = "DeviceApi/CheckDeviceLink";
const linkDeviceWithCode = "DeviceApi/LinkDevice";
const checkSharedDeviceCode = "AuthApi/CheckSharedDeviceCode";
const logoutUrl = "AuthApi/Logout";
const checkTokenUrl = "AuthApi/Check";
const checkSharedDeviceWithSanad = "AuthApi/CheckSharedDeviceWithSannad";

const types = {
  IMEI_PENDING: "IMEI_PENDING",
  IMEI_SUCCESS: "IMEI_SUCCESS",
  IMEI_FAILURE: "IMEI_FAILURE",

  CHECK_LINK_PENDING: "CHECK_LINK_PENDING",
  CHECK_LINK_SUCCESS: "CHECK_LINK_SUCCESS",
  CHECK_LINK_FAILURE: "CHECK_LINK_FAILURE",

  LINK_WITH_CODE_PENDING: "LINK_WITH_CODE_PENDING",
  LINK_WITH_CODE_SUCCESS: "LINK_WITH_CODE_SUCCESS",
  LINK_WITH_CODE_FAILURE: "LINK_WITH_CODE_FAILURE",

  CHANGE_SIGN_PENDING: "CHANGE_SIGN_PENDING",
  CHANGE_SIGN_SUCCESS: "CHANGE_SIGN_SUCCESS",
  CHANGE_SIGN_FAILURE: "CHANGE_SIGN_FAILURE",

  DEGITAL_PENDING: "DEGITAL_PENDING",
  DEGITAL_SUCCESS: "DEGITAL_SUCCESS",
  DEGITAL_FAILURE: "DEGITAL_FAILURE",

  TOKEN_PENDING: "TOKEN_PENDING",
  TOKEN_SUCCESS: "TOKEN_SUCCESS",
  TOKEN_FAILURE: "TOKEN_FAILURE",

  LOGOUT_PENDING: "LOGOUT_PENDING",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOGOUT_FAILURE: "LOGOUT_FAILURE",

  CLEAR_DATA_SUCCESS: "CLEAR_DATA_SUCCESS",

  CHECK_TOKEN_PENDING: "CHECK_TOKEN_PENDING",
  CHECK_TOKEN_SUCCESS: "CHECK_TOKEN_SUCCESS",
  CHECK_TOKEN_FAILURE: "CHECK_TOKEN_FAILURE",

  CHECK_DEVICE_PENDING: "CHECK_DEVICE_PENDING",
  CHECK_DEVICE_SUCCESS: "CHECK_DEVICE_SUCCESS",
  CHECK_DEVICE_FAILURE: "CHECK_DEVICE_FAILURE",

  LOGIN_RESET: "LOGIN_RESET",

  CHECK_SANAD_VERIFICATION_SUCCESS: "CHECK_SANAD_VERIFICATION_SUCCESS",
};

export const actions = {
  clearData: async (dispatch) => {
    dispatch({
      type: types.CLEAR_DATA_SUCCESS,
    });
  },

  checkNationalNoDeviceId: async (dispatch, nationalNo, password, uniqueId) => {
    dispatch({
      type: types.IMEI_PENDING,
    });
    const data = {
      NationalNumber: nationalNo,
      Password: password,
      DeviceUniqueId: uniqueId,
    };
    await ApiClient.post(checkNationalNoDeviceIdUrl, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.IMEI_SUCCESS,
          error: response.data.error,
        });
      } else {
        dispatch({
          type: types.IMEI_FAILURE,
          error: response.data.error,
        });
      }
    });
  },

  checkDigitalNumber: async (dispatch, nationalNo, digitalNo, password) => {
    dispatch({
      type: types.DEGITAL_PENDING,
    });
    const data = {
      NationalNumber: nationalNo,
      DigitalNumber: digitalNo,
      Password: password,
      error: null,
    };

    await ApiClient.post(checkDigitalNumberUrl, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.DEGITAL_SUCCESS,
          dataDegital: true,
          hasSign: response.data.HasSign,
        });
      } else {
        dispatch({
          type: types.DEGITAL_FAILURE,
          dataDegital: false,
          error: response.data.error,
        });
      }
    });
  },

  signUp: async (dispatch, nationalNo, digitalNo, sign, password, uniqueId) => {
    dispatch({
      type: types.TOKEN_PENDING,
    });
    const data = {
      NationalNumber: nationalNo,
      DigitalNumber: digitalNo,
      SignPic: sign,
      Password: password,
      DeviceUniqueId: uniqueId,
    };

    await ApiClient.post(signUpUrl, data).then((response) => {
      if (response.ok) {
        var user = jwtDecode(response.data.Token);
        dispatch({
          type: types.TOKEN_SUCCESS,
          dataToken: response.data.Token,
          deviceUniqueId: uniqueId,
          nationalNo: nationalNo,
          password: password,
          digitalNo: digitalNo,
          invitationViewOnly: user.invitationViewOnly,
          unLimated: user.unlimitedAccess == "true",
        });
      } else {
        dispatch({
          type: types.TOKEN_FAILURE,
        });
      }
    });
  },
  resetLogin: async (dispatch) => {
    dispatch({
      type: types.LOGIN_RESET,
    });
  },
  checkShared: async (dispatch, digitalNo, deviceUniqueId) => {
    dispatch({
      type: types.CHECK_DEVICE_PENDING,
    });
    const data = {
      Code: digitalNo,
    };

    await ApiClient.post(checkSharedDeviceCode, data).then((response) => {
      if (response.ok) {
        var user = jwtDecode(response.data.Token);
        dispatch({
          type: types.CHECK_DEVICE_SUCCESS,
          nationalNoShared: response.data.NationalNumber,
          passwordShared: response.data.Password,
          digitalNoShared: response.data.Pin,
          deviceUniqueIdShared: deviceUniqueId,
          hasSignShared: response.data.HasSign,
          tokenShared: response.data.Token,
          unLimated: user?.unlimitedAccess === "true",
        });
      } else {
        dispatch({
          type: types.CHECK_DEVICE_FAILURE,
          errorOtp: response.data.error,
        });
      }
    });
  },

  changeSign: async (dispatch, sign, checkToUpdateSignPic) => {
    dispatch({
      type: types.CHANGE_SIGN_PENDING,
    });
    const data = {
      SignPic: sign,
    };

    await ApiClient.post(updateSignPictureUrl, data).then((response) => {
      if (response.ok) {
        if (checkToUpdateSignPic) {
          checkToUpdateSignPic();
        }
        dispatch({
          type: types.CHANGE_SIGN_SUCCESS,
        });
      } else {
        dispatch({
          type: types.CHANGE_SIGN_FAILURE,
        });
      }
    });
  },

  checkDeviceLink: async (dispatch, uniqueId) => {
    dispatch({
      type: types.CHECK_LINK_PENDING,
    });
    const data = {
      DeviceUniqueId: uniqueId,
    };

    await ApiClient.post(checkLinkUrl, data).then((response) => {
      if (response.ok) {
        //console.log('*****data 231231 : ', response.data);
        dispatch({
          type: types.CHECK_LINK_SUCCESS,
          isDeviceLinked: response.data.isLink,
          isShared: response.data.deviceTypeId,
          staticIP: response.data.staticIp ? response.data.staticIp : null,
        });
      } else {
        dispatch({
          type: types.CHECK_LINK_FAILURE,
        });
      }
    });
  },

  linkDeviceWithCode: async (dispatch, uniqueId, code) => {
    dispatch({
      type: types.LINK_WITH_CODE_PENDING,
    });
    const data = {
      DeviceUniqueId: uniqueId,
      Code: code,
    };

    await ApiClient.post(linkDeviceWithCode, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.LINK_WITH_CODE_SUCCESS,
          isLinkDeviceCodeValid: response.data.isValid,
          deviceTypeId: response.data.deviceTypeId,
        });
      } else {
        dispatch({
          type: types.LINK_WITH_CODE_FAILURE,
          error: "error",
        });
      }
    });
  },

  logout: async (dispatch, uniqueId) => {
    dispatch({
      type: types.LOGOUT_PENDING,
    });
    const data = {
      DeviceUniqueId: uniqueId,
    };

    await ApiClient.post(logoutUrl, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.LOGOUT_SUCCESS,
        });
      } else {
        dispatch({
          type: types.LOGOUT_FAILURE,
        });
      }
    });
  },

  checkToken: async (dispatch) => {
    dispatch({
      type: types.CHECK_TOKEN_PENDING,
    });

    try {
      await ApiClient.post(checkTokenUrl).then((response) => {
        if (response.ok) {
          dispatch({
            type: types.CHECK_TOKEN_SUCCESS,
          });
        } else {
          dispatch({
            type: types.CHECK_TOKEN_FAILURE,
            error: "error",
          });
        }
      });
    } catch {
      dispatch({
        type: types.CHECK_TOKEN_FAILURE,
        error: "error",
      });
    }
  },
  checkSharedDeviceWithSanad: async (
    dispatch,
    code,
    sannadCode,
    navigation,
    setState
  ) => {
    const data = {
      Code: code,
      SannadCode: sannadCode,
    };

    try {
      await ApiClient.post(checkSharedDeviceWithSanad, data).then(
        (response) => {
          if (response.ok) {
            navigation.replace("Home");
            dispatch({
              type: types.CHECK_SANAD_VERIFICATION_SUCCESS,
              tokenShared: response.data.Token,
            });
          } else {
            this.setState({ error: true });
            dispatch({
              type: types.DEGITAL_FAILURE,
              error: response.data.error,
            });
          }
        }
      );
    } catch {
      dispatch({
        type: types.DEGITAL_FAILURE,
        error: "error",
      });
    }
  },
};

const initialState = {
  flagImei: null,
  token: null,
  deviceUniqueId: null,
  nationalNo: null,
  password: null,
  digitalNo: null,
  invitationViewOnly: false,
  check: null,
  isDeviceLinked: null,
  isSharedLoading: false,
  isSharedError: null,
  isLinkDeviceCodeValid: null,
  staticIP: null,
  digital: null,
  isLoading: false,
  isCheck: false,
  isFetch: false,
  isChange: false,
  isLogout: false,
  isLink: null,
  isLogin: false,
  isTokenCheck: false,
  error: null,
  errorShared: null,
  deviceTypeId: null,
  nationalNoShared: null,
  passwordShared: null,
  digitalNoShared: null,
  hasSignShared: null,
  isShared: null,
  hasSign: null,
  tokenShared: null,
  unLimated: false,
};

export const reducer = (state = initialState, action) => {
  const {
    type,
    error,
    isLinkDeviceCodeValid,
    isDeviceLinked,
    isShared,
    dataToken,
    errorOtp,
    nationalNo,
    password,
    digitalNo,
    deviceUniqueId,
    hasSign,
    deviceTypeId,
    nationalNoShared,
    passwordShared,
    digitalNoShared,
    hasSignShared,
    deviceUniqueIdShared,
    tokenShared,
    invitationViewOnly,
    staticIP,
    unLimated,
  } = action;

  switch (type) {
    case types.CLEAR_DATA_SUCCESS: {
      return {
        ...state,
        token: null,
        nationalNo: null,
        password: null,
        digitalNo: null,
        isLoading: false,
        error: null,
      };
    }
    case types.LOGOUT_PENDING: {
      return {
        ...state,
        isLogout: true,
        error: null,
      };
    }
    case types.LOGOUT_SUCCESS: {
      return {
        ...state,
        isLogout: false,
        error: null,
        token: null,
        isLoading: false,
        unLimated: false,
        //isLogin: false,
        error: null,
      };
    }
    case types.LOGOUT_FAILURE: {
      return {
        ...state,
        isLogout: false,
        token: null,
        isLoading: false,
        //isLogin: false,
        error: null,
        error,
      };
    }
    case types.CHECK_DEVICE_PENDING: {
      return {
        ...state,
        isSharedLoading: true,
        isSharedError: null,
        errorShared: null,
        tokenShared: null,
      };
    }
    case types.CHECK_DEVICE_SUCCESS: {
      return {
        ...state,
        nationalNoShared: nationalNoShared,
        passwordShared: passwordShared,
        digitalNoShared: digitalNoShared,
        hasSignShared: hasSignShared,
        isSharedLoading: false,
        isSharedError: false,
        deviceUniqueId: deviceUniqueIdShared,
        tokenShared: tokenShared,
        errorShared: null,
        unLimated: unLimated,
      };
    }
    case types.CHECK_DEVICE_FAILURE: {
      return {
        isSharedLoading: false,
        isSharedError: true,
        errorShared: errorOtp,
        tokenShared: null,
      };
    }
    case types.LOGIN_RESET: {
      return {
        ...state,
        token: null,
        isLoading: false,
        isLogin: false,
        error: null,
      };
    }
    case types.TOKEN_PENDING: {
      return {
        ...state,
        token: null,
        isLoading: true,
        isLogin: false,
        error: null,
      };
    }
    case types.TOKEN_SUCCESS: {
      return {
        ...state,
        token: dataToken,
        deviceUniqueId,
        nationalNo,
        isLogin: true,
        password,
        digitalNo,
        invitationViewOnly,
        unLimated,
        isLoading: false,
        error: null,
      };
    }
    case types.TOKEN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        token: null,
        isLogin: false,
        error,
      };
    }

    case types.CHECK_LINK_PENDING: {
      return {
        ...state,
        isDeviceLinked: null,
        isShared: null,
        isCheck: true,
        error: null,
      };
    }
    case types.CHECK_LINK_SUCCESS: {
      return {
        ...state,
        isDeviceLinked: isDeviceLinked,
        isShared: isShared,
        staticIP: staticIP,
        isCheck: false,
        error: null,
      };
    }
    case types.CHECK_LINK_FAILURE: {
      return {
        ...state,
        isDeviceLinked: null,
        isShared: null,
        isCheck: false,
        error,
      };
    }

    case types.LINK_WITH_CODE_PENDING: {
      return {
        ...state,
        isLink: null,
        isLinkDeviceCodeValid: null,
        deviceTypeId: null,
        error: null,
      };
    }
    case types.LINK_WITH_CODE_SUCCESS: {
      return {
        ...state,
        isLink: true,
        isLinkDeviceCodeValid: isLinkDeviceCodeValid,
        deviceTypeId: deviceTypeId,
        error: null,
      };
    }
    case types.LINK_WITH_CODE_FAILURE: {
      return {
        ...state,
        isLink: false,
        isLinkDeviceCodeValid: false,
        deviceTypeId: null,
        error: "error",
      };
    }

    case types.IMEI_PENDING: {
      return {
        ...state,
        flagImei: null,
        isLoading: true,
        error: null,
      };
    }
    case types.IMEI_SUCCESS: {
      return {
        ...state,
        flagImei: true,
        isLoading: false,
        error: null,
      };
    }
    case types.IMEI_FAILURE: {
      return {
        ...state,
        flagImei: false,
        isLoading: false,
        error: error,
      };
    }

    case types.CHANGE_SIGN_PENDING: {
      return {
        ...state,
        isChange: false,
        error: null,
      };
    }
    case types.CHANGE_SIGN_SUCCESS: {
      return {
        ...state,
        isChange: true,
        error: null,
      };
    }
    case types.CHANGE_SIGN_FAILURE: {
      return {
        ...state,
        isChange: false,
        error: error,
      };
    }

    case types.DEGITAL_PENDING: {
      return {
        ...state,
        digital: null,
        isFetch: true,
        hasSign: null,
        error: null,
      };
    }
    case types.DEGITAL_SUCCESS: {
      return {
        ...state,
        digital: true,
        hasSign: hasSign,
        isFetch: false,
        error: null,
      };
    }
    case types.DEGITAL_FAILURE: {
      return {
        ...state,
        hasSign: null,
        digital: false,
        isFetch: false,
        error: error,
      };
    }
    case types.CHECK_TOKEN_PENDING: {
      return {
        ...state,
        isTokenCheck: false,
        error: null,
      };
    }
    case types.CHECK_TOKEN_SUCCESS: {
      return {
        ...state,
        isTokenCheck: true,
        isLogin: true,
        error: null,
      };
    }
    case types.CHECK_TOKEN_FAILURE: {
      return {
        ...state,
        isTokenCheck: false,
        error: error,
      };
    }

    case types.CHECK_SANAD_VERIFICATION_SUCCESS: {
      return {
        ...state,
        tokenShared,
      };
    }
  }
  return state;
};
