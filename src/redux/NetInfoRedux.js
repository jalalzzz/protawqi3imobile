const types = {
  UPDATE_CONNECTION_STATUS: "UPDATE_CONNECTION_STATUS",
};

export const actions = {
  updateConnectionStatus: (dispatch, isConnected, connectedType) => {
    dispatch({
      type: types.UPDATE_CONNECTION_STATUS,
      isConnected,
      connectedType,
    });
  },
};

const initialState = {
  isConnected: true,
  connectedType: null,
};

export const reducer = (state = initialState, action) => {
  const { type, connectedType, isConnected } = action;

  switch (type) {
    case types.UPDATE_CONNECTION_STATUS:
      return {
        ...state,
        isConnected: isConnected,
        connectedType: connectedType,
      };
    default:
      return state;
  }
};
