const types = {
  UPDATE_CURRENT_LOCATION: 'UPDATE_CURRENT_LOCATION',
};

export const actions = {
  updateLocation: (dispatch, longitude, latitude) => {
    dispatch({
      type: types.UPDATE_CURRENT_LOCATION,
      longitude,
      latitude,
    });
  },
};

const initialState = {
  longitude: null,
  latitude: null,
};

export const reducer = (state = initialState, action) => {
  const { type, longitude, latitude } = action;

  switch (type) {
    case types.UPDATE_CURRENT_LOCATION:
      return {
        ...state,
        longitude: longitude,
        latitude: latitude,
      };
    default:
      return state;
  }
};
