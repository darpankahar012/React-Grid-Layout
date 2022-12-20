import axios from "axios";
import { parseInt } from "lodash";
import {
  getWidget,
  getWidgetSuccess,
  getWidgetError,
  resetLogin,
  getWidgetList,
  getWidgetListSuccess,
  getWidgetListError,
  saveWidgetList,
  saveWidgetListSuccess,
  saveWidgetListError,
  addedWidgetData,
  layoutChangeSuccess,
  addedWidget,
  autoWidgetRefreshList,
  autoWidgetRefreshListError,
  autoWidgetRefreshLoading,
} from "../store/actions";

export class widgetService {
  static getWidget = (req) => {
    console.log("🚀 ~ file: Widget.js ~ line 6 ~ widgetService ~ req", req);
    return (dispatch) => {
      dispatch(getWidget());
      axios
        .post(
          `${
            process.env.REACT_APP_API_URL + "/" + req.key + "?key=" + req.label
          }`,
          { FromDate: "10-12-2022", ToDate: "18-12-2022" },
          // {},
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Authkey: `${process.env.REACT_APP_API_AUTH_KEY}`,
            },
          }
        )
        .then((response) => {
          // console.log(
          //   "🚀 ~ file: widget.js:41 ~ widgetService ~ .then ~ response",
          //   response
          // );
          if (response.data.status === 1) {
            dispatch(addedWidgetData(req));
            dispatch(addedWidget(req));
            dispatch(
              getWidgetSuccess({
                value: response.data.responseData,
                message: response.data.message,
                id: req.id,
              })
            );
          } else if (response.data.status === 0) {
            dispatch(addedWidgetData(req));
            dispatch(addedWidget(req));
            dispatch(
              getWidgetSuccess({
                value: response.data.responseData,
                message: response.data.message,
                id: req.id,
              })
            );
          } else {
            dispatch(getWidgetError(response.data.message));
          }
        })
        .catch((error) => {
          console.log(
            "🚀 ~ file: widget.js:69 ~ widgetService ~ return ~ error",
            error
          );
          if (error.response.data === "Unauthorized.") {
            dispatch(getWidgetError("Unauthorized."));
            global.localStorage.clear();
          } else {
            dispatch(getWidgetError("Widget error"));
          }
        });
    };
  };

  static autoRefreshGetWidget = (req) => {
    // console.log("🚀 ~ file: Widget.js ~ line 6 ~ widgetService ~ req", req);
    return (dispatch) => {
      dispatch(autoWidgetRefreshLoading());
      axios
        .post(
          `${
            process.env.REACT_APP_API_URL + "/" + req.key + "?key=" + req.label
          }`,
          { FromDate: "10-12-2022", ToDate: "18-12-2022" },
          // {},
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Authkey: `${process.env.REACT_APP_API_AUTH_KEY}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === 1) {
            // console.log(JSON.parse(JSON.stringify(response.data.responseData)));
            let data = {
              message: response.data.message,
              value: response.data.responseData,
              id: req.index,
            };
            dispatch(autoWidgetRefreshList(data));
          } else if (response.data.status === 0) {
            let data = {
              message: response.data.message,
              value: response.data.responseData,
              id: req.index,
            };
            dispatch(autoWidgetRefreshList(data));
          } else {
            dispatch(autoWidgetRefreshListError(response.data.message));
          }
        })
        .catch((error) => {
          if (error.response.data === "Unauthorized.") {
            dispatch(getWidgetError("Unauthorized."));
            global.localStorage.clear();
          } else {
            dispatch(autoWidgetRefreshListError("Widget error"));
          }
        });
    };
  };

  static getWidgetList = (req) => {
    // console.log("🚀 ~ file: Widget.js ~ line 6 ~ widgetService ~ req", req);
    return (dispatch) => {
      dispatch(getWidgetList());
      axios
        .post(
          `${process.env.REACT_APP_API_URL + "/" + req}`,
          {},
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Authkey: `${process.env.REACT_APP_API_AUTH_KEY}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === 1) {
            dispatch(
              layoutChangeSuccess(
                JSON.parse(response.data.responseData.results)
              )
            );
            dispatch(
              getWidgetListSuccess({
                value: JSON.parse(response.data.responseData.results),
                message: response.data.message,
              })
            );
          } else if (response.data.status === 0) {
            dispatch(
              getWidgetListSuccess({
                value: response.data.responseData,
                message: response.data.message,
              })
            );
          } else {
            dispatch(getWidgetListError(response.data.message));
          }
        })
        .catch((error) => {
          if (error?.response?.data) {
            if (error.response.data === "Unauthorized.") {
              dispatch(getWidgetError("Unauthorized."));
              global.localStorage.clear();
            } else {
              dispatch(getWidgetListError(error.response.data));
            }
          }
        });
    };
  };

  static saveWidgetData = (req) => {
    // console.log("🚀 ~ file: Widget.js ~ line 6 ~ widgetService ~ req", req);
    return (dispatch) => {
      dispatch(saveWidgetList());
      axios
        .post(
          `${process.env.REACT_APP_API_URL + "/" + req.url}`,
          { widgetData: req.data },
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Authkey: `${process.env.REACT_APP_API_AUTH_KEY}`,
            },
          }
        )
        .then((response) => {
          if (response.data.status === 1) {
            dispatch(
              saveWidgetListSuccess({
                value: response.data.responseData,
                message: response.data.message,
              })
            );
          } else if (response.data.status === 0) {
            dispatch(
              saveWidgetListSuccess({
                value: response.data.responseData,
                message: response.data.message,
              })
            );
          } else {
            dispatch(saveWidgetListError(response.data.message));
          }
        })
        .catch((error) => {
          if (error.response.data === "Unauthorized.") {
            dispatch(getWidgetError("Unauthorized."));
            global.localStorage.clear();
          } else {
            dispatch(saveWidgetListError(error.response.data));
          }
        });
    };
  };
}
