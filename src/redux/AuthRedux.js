import { ApiClient } from '@services';
import { UserModel } from '@models';

const userInfoUrl = 'AuthApi/UserInfo';

const types = {
  USER_INFO_PENDING: 'USER_INFO_PENDING',
  USER_INFO_SUCCESS: 'USER_INFO_SUCCESS',
  USER_INFO_FAILURE: 'USER_INFO_FAILURE',
};

export const actions = {
  getUserInfo: async (dispatch) => {
    dispatch({
      type: types.USER_INFO_PENDING,
    });
    const data = {};
    await ApiClient.post(userInfoUrl, data).then((response) => {
      var data = prepareUserData(response.data);
      if (response.ok) {
        dispatch({
          type: types.USER_INFO_SUCCESS,
          userData: data,
        });
      } else {
        dispatch({
          type: types.USER_INFO_FAILURE,
        });
      }
    });
  },
};

const initialState = {
  userInfo: null,
  isLoading: false,
  error: null,
};

export const reducer = (state = initialState, action) => {
  const { type, error, userData } = action;
  switch (type) {
    case types.USER_INFO_PENDING: {
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    }
    case types.USER_INFO_SUCCESS: {
      return {
        ...state,
        userInfo: userData,
        isLoading: false,
        error: null,
      };
    }
    case types.USER_INFO_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error,
      };
    }
  }
  return state;
};
const prepareUserItem = (item) => {
  const model = new UserModel(
    '',
    item.NationalNumber,
    item.FullName,
    item.DayOfBirthStr,
    '',
    item.DepartmentName,
    item.Email,
    item.PhoneNumber,
    '',
    '',
    item.JobTitleName,
    '',
    item.SignPictureUrl,
    item.NickName,
    item.ShortName
  );
  return model;
};
const prepareUserData = (data) => {
  const model = prepareUserItem(data);
  return model;
};
