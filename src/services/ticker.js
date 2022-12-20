import axios from "axios";
import { tickerLoading, tickerSuccess, tickerError } from "../store/actions";

export class TickerService {
  static TickerList = () => {
    return (dispatch) => {
      dispatch(tickerLoading());
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/getTicker`,
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
          console.log("response.data", response.data);
          if (response.data.status === 1) {
            dispatch(tickerSuccess(response.data.responseData));
          } else {
            dispatch(tickerError(response.data.message));
          }
        })
        .catch((error) => {
          console.log("Login error");
          localStorage.clear();
          dispatch(tickerError("Login error"));
        });
    };
  };
}
