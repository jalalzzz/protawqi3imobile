import { ApiClient } from "@services";
import { ReasonModel } from "@models";

const timeZoneUrl = "UserApi/UpdateTimeZone";

const types = {
  SAVE_TIMEZONE_PENDING: "SAVE_TIMEZONE_PENDING",
  SAVE_TIMEZONE_SUCCESS: "SAVE_TIMEZONE_SUCCESS",
  SAVE_TIMEZONE_FAILURE: "SAVE_TIMEZONE_FAILURE",
};

export const actions = {
  saveTimeZoneName: async (dispatch, timeZoneName) => {
    dispatch({
      type: types.SAVE_TIMEZONE_PENDING,
    });
    const data = {
      TimeZoneName: timeZoneName,
    };

    await ApiClient.post(timeZoneUrl, data).then((response) => {
      if (response.ok) {
        dispatch({
          type: types.SAVE_TIMEZONE_SUCCESS,
          timeZoneName: timeZoneName,
        });
      } else {
        dispatch({
          type: types.SAVE_TIMEZONE_FAILURE,
        });
      }
    });
  },
};

const initialState = {
  timeZoneName: null,
  isLoading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, timeZoneName } = action;
  switch (type) {
    case types.SAVE_TIMEZONE_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.SAVE_TIMEZONE_SUCCESS: {
      return {
        timeZoneName: timeZoneName,
        isLoading: false,
        error: null,
      };
    }

    case types.SAVE_TIMEZONE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
  }

  return state;
};
const prepareReasonData = (data) => {
  let listReason = [];
  if (data && data.length > 0) {
    data.map((item) => {
      var Reason = new ReasonModel(item.Name, item.DisplayOrder, item.Id);
      listReason.push(Reason);
    });
  }

  return listReason;
};
