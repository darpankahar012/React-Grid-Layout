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

export const resetGetWidgetStatus = () => {
  return {
    type: widgetActions.RESET_GET_WIDGET_STATUS,
  };
};

export const getWidgetList = () => {
  return {
    type: widgetActions.GET_WIDGET_LIST,
  };
};

export const getWidgetListSuccess = (data) => {
  return {
    type: widgetActions.GET_WIDGET_LIST_SUCCESS,
    payload: data,
  };
};

export const getWidgetListError = (error) => {
  return {
    type: widgetActions.GET_WIDGET_LIST_ERROR,
    payload: error,
  };
};

export const saveWidgetList = () => {
  return {
    type: widgetActions.SAVE_WIDGET_LIST,
  };
};

export const saveWidgetListSuccess = (data) => {
  return {
    type: widgetActions.SAVE_WIDGET_LIST_SUCCESS,
    payload: data,
  };
};

export const saveWidgetListError = (error) => {
  return {
    type: widgetActions.SAVE_WIDGET_LIST_ERROR,
    payload: error,
  };
};

export const saveWidgetListResetToast = () => {
  return {
    type: widgetActions.SAVE_WIDGET_LIST_RESET_TOAST,
  };
};

export const addedWidgetData = (data) => {
  return {
    type: widgetActions.ADDED_WIDGET_DATA,
    payload: data,
  };
};

export const resetAddedWidgetData = () => {
  return {
    type: widgetActions.RESET_ADDED_WIDGET_DATA,
  };
};

export const addedWidget = () => {
  return {
    type: widgetActions.ADDED_WIDGET,
  };
};

export const resetaddedWidget = () => {
  return {
    type: widgetActions.RESET_ADDED_WIDGET,
  };
};

export const autoWidgetRefreshLoading = (data) => {
  return {
    type: widgetActions.AUTO_REFRESH_WIDGET_LOADING,
  };
};

export const autoWidgetRefreshList = (data) => {
  return {
    type: widgetActions.AUTO_REFRESH_WIDGET_LIST,
    payload: data,
  };
};

export const autoWidgetRefreshListError = (data) => {
  return {
    type: widgetActions.AUTO_REFRESH_WIDGET_LIST_ERROR,
    payload: data,
  };
};
