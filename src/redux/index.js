import { createStore } from "redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { persistCombineReducers } from "redux-persist";
import { reducer as NetInfoReducer } from "./NetInfoRedux";
import { reducer as RegisterRedux } from "./RegisterRedux";
import { reducer as InvitationRedux } from "./InvitationRedux";
import { reducer as UserRedux } from "./UserRedux";
import { reducer as ResolutionRedux } from "./ResolutionRedux";
import { reducer as AuthRedux } from "./AuthRedux";
import { reducer as LangRedux } from "./LangRedux";
import { reducer as DocSignRedux } from "./DocSignRedux";
import { reducer as PushNotificationsRedux } from "./PushNotificationsRedux";
import { reducer as LocationRedux } from "./LocationRedux";

const persistConfig = {
  key: "persistedReducer",
  storage: AsyncStorage,
  blacklist: ["netInfo", "notification"],
};
``;

export const notificationsPersistConfig = {
  key: "NotificationsReducer",
  storage: AsyncStorage,
  blacklist: ["notifications", "totalNotifications"],
};

export default persistCombineReducers(persistConfig, {
  netInfo: NetInfoReducer,
  register: RegisterRedux,
  pdf: InvitationRedux,
  user: UserRedux,
  resolution: ResolutionRedux,
  auth: AuthRedux,
  lang: LangRedux,
  docSign: DocSignRedux,
  notification: persistReducer(
    notificationsPersistConfig,
    PushNotificationsRedux
  ),
  location: LocationRedux,
});

// const store = createStore(persistedReducer);

// let persistor = persistStore(store);

// export { store, persistor };
