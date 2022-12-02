import { widgetActions } from "../constants";

export const getWidget = () => {
  return {
    type: widgetActions.GET_WIDGET,
  };
};

export const getWidgetSuccess = (data) => {
  return {
    type: widgetActions.GET_WIDGET_SUCCESS,
    payload: data,
  };
};

export const getWidgetError = (error) => {
  return {
    type: widgetActions.GET_WIDGET_ERROR,
    payload: error,
  };
};

export const getWidgetErrorReSet = (error) => {
  return {
    type: widgetActions.GET_WIDGET_RESET_ERROR,
    payload: error,
  };
};
