import { widgetActions } from "../constants";

const initialState = {
  loading: false,
  error: "",
  data: "",
  widgetAutoRefreshLoading: false,
  widgetAutoRefresh: [],
  widgetAutoRefreshError: "",
  widgetAdded: false,
  widgetAddedData: {},
  widgetsListLoading: false,
  widgetsListData: "",
  widgetsListError: "",
  saveWidgetsListLoading: false,
  saveWidgetsListData: "",
  saveWidgetsListError: "",
  saveWidgetsListToast: false,
};

export const widget = (state = initialState, action) => {
  switch (action.type) {
    case widgetActions.GET_WIDGET:
      return {
        ...state,
        loading: true,
        data: "",
        // widgetAdded: false,
        error: "",
      };
    case widgetActions.GET_WIDGET_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        // widgetAdded: true,
        error: "",
      };

    case widgetActions.GET_WIDGET_ERROR:
      return {
        ...state,
        loading: false,
        data: "",
        // widgetAdded: false,
        error: action.payload,
      };

    case widgetActions.GET_WIDGET_RESET_ERROR:
      return {
        ...state,
        loading: false,
        data: "",
        error: "",
      };

    case widgetActions.ADDED_WIDGET_DATA:
      return {
        ...state,
        widgetAddedData: action.payload,
      };

    case widgetActions.RESET_ADDED_WIDGET_DATA:
      return {
        ...state,
        widgetAddedData: {},
      };

    case widgetActions.ADDED_WIDGET:
      return {
        ...state,
        widgetAdded: true,
      };
    case widgetActions.RESET_ADDED_WIDGET:
      return {
        ...state,
        widgetAdded: false,
      };

    case widgetActions.AUTO_REFRESH_WIDGET_LOADING:
      return {
        ...state,
        widgetAutoRefreshLoading: true,
        widgetAutoRefresh: "",
        widgetAutoRefreshError: "",
      };
    case widgetActions.AUTO_REFRESH_WIDGET_LIST:
      return {
        ...state,
        widgetAutoRefreshLoading: false,
        widgetAutoRefresh: action.payload,
        widgetAutoRefreshError: "",
      };
    case widgetActions.AUTO_REFRESH_WIDGET_LIST_ERROR:
      return {
        ...state,
        widgetAutoRefreshLoading: false,
        widgetAutoRefresh: "",
        widgetAutoRefreshError: action.payload,
      };

    case widgetActions.RESET_GET_WIDGET_STATUS:
      return {
        ...state,
        loading: false,
        // widgetAdded: false,
        data: "",
        error: "",
      };

    case widgetActions.GET_WIDGET_LIST:
      return {
        ...state,
        widgetsListLoading: true,
        widgetsListData: "",
        widgetsListError: "",
      };
    case widgetActions.GET_WIDGET_LIST_SUCCESS:
      return {
        ...state,
        widgetsListLoading: false,
        widgetsListData: action.payload,
        widgetsListError: "",
      };
    case widgetActions.GET_WIDGET_LIST_ERROR:
      return {
        ...state,
        widgetsListLoading: false,
        widgetsListData: "",
        widgetsListError: action.payload,
      };
    case widgetActions.SAVE_WIDGET_LIST:
      return {
        ...state,
        saveWidgetsListLoading: true,
        saveWidgetsListData: "",
        saveWidgetsListError: "",
        saveWidgetsListToast: false,
      };
    case widgetActions.SAVE_WIDGET_LIST_SUCCESS:
      return {
        ...state,
        saveWidgetsListLoading: false,
        saveWidgetsListData: action.payload,
        saveWidgetsListError: "",
        saveWidgetsListToast: true,
      };
    case widgetActions.SAVE_WIDGET_LIST_ERROR:
      return {
        ...state,
        saveWidgetsListLoading: false,
        saveWidgetsListData: "",
        saveWidgetsListError: action.payload,
        saveWidgetsListToast: true,
      };
    case widgetActions.SAVE_WIDGET_LIST_RESET_TOAST:
      return {
        ...state,
        saveWidgetsListToast: false,
      };
    default:
      return state;
  }
};
