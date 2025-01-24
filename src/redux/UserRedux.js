import { ApiClient } from "@services";
import { Alert } from "react-native";

const getAllDocSignUser = "DocSignUserApi/GetAllDocSignUser";
const getInfo = "DocSignApi/GetInfo";
const getAttachment = "DocSignApi/GetAttachments";
const checkSign = "DocSignUserApi/CheckUserSign";
const updateSign = "DocSignUserApi/UpdateUserSign";
const viewDocSign = "DocSignUserApi/ViewDocSign";
const checkToUpdateSignPic = "UserApi/CheckToUpdateSignPic";

const types = {
  FETCH_SIGN_INFO_PENDING: "FETCH_SIGN_INFO_PENDING",
  FETCH_SIGN_INFO_SUCCESS: "FETCH_SIGN_INFO_SUCCESS",
  FETCH_SIGN_INFO_FAILURE: "FETCH_SIGN_INFO_FAILURE",

  FETCH_DOC_INFO_PENDING: "FETCH_DOC_INFO_PENDING",
  FETCH_DOC_INFO_SUCCESS: "FETCH_DOC_INFO_SUCCESS",
  FETCH_DOC_INFO_FAILURE: "FETCH_DOC_INFO_FAILURE",

  FETCH_ATTACHMENT_PENDING: "FETCH_ATTACHMENT_PENDING",
  FETCH_ATTACHMENT_SUCCESS: "FETCH_ATTACHMENT_SUCCESS",
  FETCH_ATTACHMENT_FAILURE: "FETCH_ATTACHMENT_FAILURE",

  CHECK_SIGN_PENDING: "CHECK_SIGN_PENDING",
  CHECK_SIGN_SUCCESS: "CHECK_SIGN_SUCCESS",
  CHECK_SIGN_FAILURE: "CHECK_SIGN_FAILURE",

  VIEW_DOC_PENDING: "VIEW_DOC_PENDING",
  VIEW_DOC_SUCCESS: "VIEW_DOC_SUCCESS",
  VIEW_DOC_FAILURE: "VIEW_DOC_FAILURE",

  UPDATE_SIGN_PENDING: "UPDATE_SIGN_PENDING",
  UPDATE_SIGN_SUCCESS: "UPDATE_SIGN_SUCCESS",
  UPDATE_SIGN_FAILURE: "UPDATE_SIGN_FAILURE",

  CHECK_MUST_SIGN_PENDING: "CHECK_MUST_SIGN_PENDING",
  CHECK_MUST_SIGN_SUCCESS: "CHECK_MUST_SIGN_SUCCESS",
  CHECK_MUST_SIGN_FAILURE: "CHECK_MUST_SIGN_FAILURE",
};

export const actions = {
  getSign: async (dispatch, id) => {
    dispatch({
      type: types.FETCH_SIGN_INFO_PENDING,
    });
    const data = {
      DocSignGuid: id,
    };
    await ApiClient.post(getAllDocSignUser, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.FETCH_SIGN_INFO_SUCCESS,
          sign: response.data,
        });
      } else {
        dispatch({
          type: types.FETCH_SIGN_INFO_FAILURE,
        });
      }
    });
  },

  getInfoDocument: async (dispatch, id) => {
    dispatch({
      type: types.FETCH_DOC_INFO_PENDING,
    });
    const data = {
      DocSignGuid: id,
    };
    await ApiClient.post(getInfo, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.FETCH_DOC_INFO_SUCCESS,
          doc: response.data,
        });
      } else {
        dispatch({
          type: types.FETCH_DOC_INFO_FAILURE,
        });
      }
    });
  },

  getAttachment: async (dispatch, id) => {
    dispatch({
      type: types.FETCH_ATTACHMENT_PENDING,
    });
    const data = {
      DocSignGuid: id,
    };
    await ApiClient.post(getAttachment, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.FETCH_ATTACHMENT_SUCCESS,
          attachment: response.data,
        });
      } else {
        dispatch({
          type: types.FETCH_ATTACHMENT_FAILURE,
        });
      }
    });
  },
  checkSign: async (dispatch, id) => {
    dispatch({
      type: types.CHECK_SIGN_PENDING,
    });
    const data = {
      DocSignGuid: id,
    };
    await ApiClient.post(checkSign, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.CHECK_SIGN_SUCCESS,
          signRes: response.data,
        });
      } else {
        dispatch({
          type: types.CHECK_SIGN_FAILURE,
        });
      }
    });
  },
  viewDoc: async (dispatch, id, longitude, latitude) => {
    dispatch({
      type: types.VIEW_DOC_PENDING,
    });
    const data = {
      DocSignGuid: id,
      Longitude: longitude,
      Latitude: latitude,
    };
    await ApiClient.post(viewDocSign, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.VIEW_DOC_SUCCESS,
          signRes: response.data,
        });
      } else {
        dispatch({
          type: types.VIEW_DOC_FAILURE,
        });
      }
    });
  },
  updateSign: async (
    dispatch,
    id,
    statusId,
    reason,
    longitude,
    latitude,
    navigation,
    isShared
  ) => {
    console.log("entered");
    dispatch({
      type: types.UPDATE_SIGN_PENDING,
      isSuccess: false,
      error: null,
    });
    const data = {
      DocSignGuid: id,
      DocSignUserStatusId: statusId,
      Reason: reason,
      Longitude: longitude,
      Latitude: latitude,
    };

    await ApiClient.post(updateSign, data)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          dispatch({
            type: types.UPDATE_SIGN_SUCCESS,
            isSuccess: true,
          });
        } else {
          dispatch({
            type: types.UPDATE_SIGN_FAILURE,
            isSuccess: false,
            error: response.data.error,
          });

          // if (isShared) {
          //   console.log("entered if");
          //   navigation.navigate("SharedDevice");
          // } else {
          //   console.log("entered else ");
          //   navigation.navigate("Login");
          // }
        }
      })
      .catch((error) => console.log(error, "error"));
  },
  checkToUpdateSignPic: async (dispatch, data) => {
    dispatch({
      type: types.CHECK_MUST_SIGN_PENDING,
    });
    await ApiClient.post(checkToUpdateSignPic).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.CHECK_MUST_SIGN_SUCCESS,
          payload: response?.data?.mustSign,
        });
      } else {
        dispatch({
          type: types.CHECK_MUST_SIGN_FAILURE,
        });
      }
    });
  },
};

const initialState = {
  signInfo: null,
  docInfo: null,
  attachmentList: null,
  signStatus: null,
  isLoading: false,
  isUpdate: false,
  error: null,
  mustSign: false,
  isLogout: false,
  isSuccess: false,
};

export const reducer = (state = initialState, action) => {
  const { type, error, sign, doc, attachment, signRes, isSuccess } = action;

  switch (type) {
    case types.UPDATE_SIGN_PENDING: {
      return {
        ...state,
        isUpdate: false,
        error: null,
        isSuccess,
      };
    }
    case types.UPDATE_SIGN_SUCCESS: {
      return {
        ...state,
        isUpdate: true,
        error: null,
        isSuccess,
      };
    }
    case types.UPDATE_SIGN_FAILURE: {
      return {
        ...state,
        isUpdate: false,
        error,
        isLogout: true,
        isSuccess,
      };
    }

    case types.CHECK_SIGN_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.CHECK_SIGN_SUCCESS: {
      return {
        ...state,
        signStatus: signRes,
        isLoading: false,
        error: null,
      };
    }
    case types.CHECK_SIGN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case types.VIEW_DOC_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.VIEW_DOC_SUCCESS: {
      console.log("entered");
      return {
        ...state,
        isLoading: false,
        error: null,
        // isUpdate: true,
      };
    }
    case types.VIEW_DOC_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case types.FETCH_ATTACHMENT_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.FETCH_ATTACHMENT_SUCCESS: {
      return {
        ...state,
        attachmentList: attachment,
        isLoading: false,
        error: null,
      };
    }
    case types.FETCH_ATTACHMENT_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case types.FETCH_DOC_INFO_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.FETCH_DOC_INFO_SUCCESS: {
      return {
        ...state,
        docInfo: doc,
        isLoading: false,
        error: null,
      };
    }
    case types.FETCH_DOC_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case types.FETCH_SIGN_INFO_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.FETCH_SIGN_INFO_SUCCESS: {
      return {
        ...state,
        signInfo: sign,
        isLoading: false,
        error: null,
      };
    }
    case types.FETCH_SIGN_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }

    case types.CHECK_MUST_SIGN_PENDING: {
      return {
        ...state,
      };
    }
    case types.CHECK_MUST_SIGN_SUCCESS: {
      console.log(action, "reducer");
      return {
        ...state,
        mustSign: action.payload,
      };
    }
    case types.CHECK_MUST_SIGN_FAILURE: {
      return {
        ...state,
        isUpdate: false,
        error,
      };
    }
  }
  return state;
};
