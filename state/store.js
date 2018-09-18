import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

// Put individual reducers are in the "state" folder
import { combineReducers } from "redux";
import Search from "./search";

// Use combineReducers to join them together
const ReduxStore = combineReducers({
  Search
});

// Initialize the store and enable thunks
export const initializeStore = () => {
  return createStore(
    ReduxStore,
    {},
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
};
