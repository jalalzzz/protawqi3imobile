import { applyMiddleware, createStore } from "redux";
import { persistStore } from "redux-persist";
import reducers from "@redux";

const store = createStore(reducers);

let persistor = persistStore(store);

export { store, persistor };
