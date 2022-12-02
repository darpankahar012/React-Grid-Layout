import axios from "axios";
import {
  getAllPublishers,
  getAllPublishersError,
  getAllPublishersSuccess,
} from "../store/actions";

export class PublisherService {
  static AllPublisher = (data) => {
    return (dispatch) => {
      dispatch(getAllPublishers());
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/getWidget_PublisherReport`,
          data,
          {
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
              Authkey: `${process.env.REACT_APP_API_AUTH_KEY}`,
            },
          }
        )
        .then((response) => {
          console.log("response.data", response.data);
          localStorage.removeItem("access_token");
          if (response.data.status === 1) {
            localStorage.setItem(
              "access_token",
              response.data.responseData.token
            );
            dispatch(getAllPublishersSuccess(response.data.responseData));
          } else {
            dispatch(getAllPublishersError(response.data.message));
          }
        })
        .catch((error) => {
          console.log("Login error");
          localStorage.clear();
          dispatch(getAllPublishersError("Login error"));
        });
    };
  };
}
