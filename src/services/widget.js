import axios from "axios";
import { getWidget, getWidgetSuccess, getWidgetError } from "../store/actions";

export class widgetService {
  static getWidget = (req) => {
    console.log("🚀 ~ file: Widget.js ~ line 6 ~ widgetService ~ req", req)
    return (dispatch) => {
      dispatch(getWidget());
      axios
        .post(
          `${
            process.env.REACT_APP_API_URL + "/" + req.key + "?key=" + req.label
          }`,
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
              getWidgetSuccess({
                value: response.data.responseData,
                message: response.data.message,
              })
            );
          } else {
            dispatch(getWidgetError(true));
          }
        })
        .catch((error) => {
          dispatch(getWidgetError("Widget error"));
        });
    };
  };
}