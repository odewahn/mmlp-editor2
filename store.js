import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import { SearchReducer, initialState } from "./state/search";

export const initializeStore = (initialState = initialState) => {
  return createStore(
    SearchReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
