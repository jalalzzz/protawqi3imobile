import { store } from "@store/configureStore";
import AuthTokenStorage from "@store/AuthTokenStorage";
import jwtDecode from "jwt-decode";

const UserService = {
  isUserRegistered: async () => {
    //const user = store.getState().user.user;
    const token = await AuthTokenStorage.getToken();

    if (token) {
      return true;
    }
    return false;
  },

  getUser: async () => {
    const token = await AuthTokenStorage.getToken();
    return token ? jwtDecode(token) : null;
  },
  isFullAccess: async () => {
    const token = await getUser();
    var user = token ? jwtDecode(token) : null;
    return user.unLimated == "true";
  },
};

export default UserService;
