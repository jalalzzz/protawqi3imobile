// import { ApiClient } from "@services";

// const checkLinkUrl = "DeviceApi/CheckDeviceLink";
// const linkDeviceWithCode = "DeviceApi/LinkDevice";

// const types = {
//   CHECK_LINK_PENDING: "CHECK_LINK_PENDING",
//   CHECK_LINK_SUCCESS: "CHECK_LINK_SUCCESS",
//   CHECK_LINK_FAILURE: "CHECK_LINK_FAILURE",

//   LINK_WITH_CODE_PENDING: "LINK_WITH_CODE_PENDING",
//   LINK_WITH_CODE_SUCCESS: "LINK_WITH_CODE_SUCCESS",
//   LINK_WITH_CODE_FAILURE: "LINK_WITH_CODE_FAILURE",
// };

// export const actions = {
//   checkDeviceLink: async (dispatch, uniqueId) => {
//     dispatch({
//       type: types.CHECK_LINK_PENDING,
//     });
//     const data = {
//       DeviceUniqueId: uniqueId,
//     };

//     await ApiClient.post(checkLinkUrl, data).then((response) => {
//       if (response.ok) {
//         dispatch({
//           type: types.CHECK_LINK_SUCCESS,
//           isDeviceLinked: response.data.isLink,
//           isShared: response.data.deviceTypeId,
//           staticIP: response.data.staticIP,
//         });
//       } else {
//         dispatch({
//           type: types.CHECK_LINK_FAILURE,
//         });
//       }
//     });
//   },

//   linkDeviceWithCode: async (dispatch, uniqueId, code) => {
//     dispatch({
//       type: types.LINK_WITH_CODE_PENDING,
//     });
//     const data = {
//       DeviceUniqueId: uniqueId,
//       Code: code,
//     };

//     await ApiClient.post(linkDeviceWithCode, data).then((response) => {
//       if (response.ok) {
//         dispatch({
//           type: types.LINK_WITH_CODE_SUCCESS,
//           isLinkDeviceCodeValid: response.data.isValid,
//           deviceTypeId: response.data.deviceTypeId,
//         });
//       } else {
//         dispatch({
//           type: types.LINK_WITH_CODE_FAILURE,
//           error: "error",
//         });
//       }
//     });
//   },
// };

// const initialState = {
//   isShared: null,
//   staticIP: null,
//   isDeviceLinked: null,
//   isLinkDeviceCodeValid: null,
//   deviceTypeId: null,
//   isSharedLoading: false,
//   isSharedError: null,
//   isLoading: false,
//   isCheck: false,
//   isLink: null,
//   error: null,
// };

// export const reducer = (state = initialState, action) => {
//   const {
//     type,
//     error,
//     isLinkDeviceCodeValid,
//     isDeviceLinked,
//     isShared,
//     deviceTypeId,
//     staticIP,
//   } = action;

//   switch (type) {
//     case types.CHECK_LINK_PENDING: {
//       return {
//         ...state,
//         isDeviceLinked: null,
//         isShared: null,
//         isCheck: true,
//         error: null,
//       };
//     }
//     case types.CHECK_LINK_SUCCESS: {
//       return {
//         ...state,
//         isDeviceLinked: isDeviceLinked,
//         isShared: isShared,
//         staticIP: staticIP,
//         isCheck: false,
//         error: null,
//       };
//     }
//     case types.CHECK_LINK_FAILURE: {
//       return {
//         ...state,
//         isDeviceLinked: null,
//         isShared: null,
//         isCheck: false,
//         error,
//       };
//     }

//     case types.LINK_WITH_CODE_PENDING: {
//       return {
//         ...state,
//         isLink: null,
//         isLinkDeviceCodeValid: null,
//         deviceTypeId: null,
//         error: null,
//       };
//     }
//     case types.LINK_WITH_CODE_SUCCESS: {
//       return {
//         ...state,
//         isLink: true,
//         isLinkDeviceCodeValid: isLinkDeviceCodeValid,
//         deviceTypeId: deviceTypeId,
//         error: null,
//       };
//     }
//     case types.LINK_WITH_CODE_FAILURE: {
//       return {
//         ...state,
//         isLink: false,
//         isLinkDeviceCodeValid: false,
//         deviceTypeId: null,
//         error: "error",
//       };
//     }
//   }
//   return state;
// };
