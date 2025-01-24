import { ApiClient } from "@services";

const notificationUrl = "NotificationApi/RegisterFirebaseToken";
const getAllNotificationsUrl = "NotificationApi/GetAll";
const deleteSingleNotificationUrl = "NotificationApi/Delete";

const types = {
  NOTIFICATION_PENDING: "NOTIFICATION_PENDING",
  NOTIFICATION_SUCCESS: "NOTIFICATION_SUCCESS",
  NOTIFICATION_FAILURE: "NOTIFICATION_FAILURE",
  SET_NOTIFICATIONS_SUCCESS: "SET_NOTIFICATIONS_SUCCESS",
  SET_NOTIFICATIONS_PENDING: "SET_NOTIFICATIONS_PENDING",
  SET_NOTIFICATIONS_FAILURE: "SET_NOTIFICATIONS_FAILURE",
};

export const actions = {
  sendFcmToken: async (dispatch, fcmToken, deviceUniqueId) => {
    dispatch({
      type: types.NOTIFICATION_PENDING,
    });
    const data = {
      Token: fcmToken,
      DeviceId: deviceUniqueId,
    };

    await ApiClient.post(notificationUrl, data).then((response) => {
      //console.log(data, response);

      if (response.ok) {
        dispatch({
          type: types.NOTIFICATION_SUCCESS,
        });
      } else {
        dispatch({
          type: types.NOTIFICATION_FAILURE,
        });
      }
    });
  },
  GetAllNotifications: async (dispatch, offset) => {
    dispatch({ type: types.SET_NOTIFICATIONS_PENDING });
    console.log("entered");
    const data = {
      Start: offset,
      Length: 30,
    };
    await ApiClient.get(getAllNotificationsUrl, data).then((response) => {
      //console.log(data, response);
      if (response.ok) {
        console.log(response, "response");
        dispatch({
          type: types.SET_NOTIFICATIONS_SUCCESS,
          payload: {
            notifications: response.data.Data,
            totalNotifications: response.data.recordsTotal,
            offset,
          },
        });
      } else {
        dispatch({
          type: types.SET_NOTIFICATIONS_FAILURE,
        });
      }
    });
  },
  DeleteSingleNotification: async (dispatch, id) => {
    dispatch({ type: types.SET_NOTIFICATIONS_PENDING });
    console.log("entered");
    const data = {
      id,
    };
    await ApiClient.post(deleteSingleNotificationUrl, data).then((response) => {
      //console.log(data, response);
      if (response.ok) {
        console.log(response, "response");
        actions.GetAllNotifications(dispatch, 0);
        // dispatch({
        //   type: types.SET_NOTIFICATIONS_SUCCESS,
        //   payload: {
        //     notifications: response.data.Data,
        //     totalNotifications: response.data.recordsTotal,
        //     offset,
        //   },
        // });
      } else {
        // dispatch({
        //   type: types.SET_NOTIFICATIONS_FAILURE,
        // });
      }
    });
  },
};

const initialState = {
  isLoading: false,
  error: null,
  notifications: [],
  totalNotifications: 100,
};

export const reducer = (state = initialState, action) => {
  console.log(action, "reducer");
  const { type, error } = action;
  const { notifications, totalNotifications, offset } = action.payload ?? {};

  switch (type) {
    case types.NOTIFICATION_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    }
    case types.NOTIFICATION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
    case types.SET_NOTIFICATIONS_SUCCESS: {
      console.log(action.payload, "redddducer");
      return {
        ...state,
        isLoading: false,
        error,
        notifications:
          offset === 0
            ? notifications
            : [...state.notifications, ...notifications],
        totalNotifications,
      };
    }
    case types.SET_NOTIFICATIONS_PENDING: {
      console.log(action);
      return {
        ...state,
        isLoading: true,
      };
    }
    case types.SET_NOTIFICATIONS_FAILURE: {
      console.log(action.payload);
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
  }
  return state;
};
