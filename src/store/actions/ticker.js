import { tickerActionTypes } from "../constants";

export const tickerLoading = () => {
  return {
    type: tickerActionTypes.TICKER_LOADING,
  };
};

export const tickerSuccess = (data) => {
  return {
    type: tickerActionTypes.TICKER_SUCCESS,
    payload: data,
  };
};

export const tickerError = (data) => {
  return {
    type: tickerActionTypes.TICKER_ERROR,
    payload: data,
  };
};

export const tickerReset = () => {
  return {
    type: tickerActionTypes.TICKER_RESET,
  };
};
