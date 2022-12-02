import { combineReducers } from "redux";
import { login, publisher, forgotPassword, layout, widget } from "./reducers";

const appReducer = combineReducers({
  publisher: publisher,
  login: login,
  forgotPassword: forgotPassword,
  layout: layout,
  widget: widget,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_SUCCESS") {
    state = initialState;
  }

  return appReducer(state, action);
};

export default rootReducer;
