import { widgetActions } from "../constants";

const initialState = {
  loading: false,
  error: "",
  data: "",
};

export const widget = (state = initialState, action) => {
  switch (action.type) {
    case widgetActions.GET_WIDGET:
      return {
        ...state,
        loading: true,
        data: "",
        error: "",
      };
    case widgetActions.GET_WIDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case widgetActions.GET_WIDGET_ERROR:
      return {
        ...state,
        loading: false,
        data: "",
        error: action.payload,
      };
    case widgetActions.GET_WIDGET_RESET_ERROR:
      return {
        ...state,
        loading: false,
        data: "",
        error: "",
      };
    default:
      return state;
  }
};
