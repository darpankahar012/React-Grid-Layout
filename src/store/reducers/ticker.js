import { tickerActionTypes } from "../constants";

const initialState = {
  loading: false,
  data: "",
  errorMsg: "",
};

export const ticker = (state = initialState, action) => {
  switch (action.type) {
    case tickerActionTypes.TICKER_LOADING:
      return {
        ...state,
        loading: true,
        data: "",
        errorMsg: "",
      };
    case tickerActionTypes.TICKER_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    case tickerActionTypes.TICKER_ERROR:
      return {
        ...state,
        loading: false,
        data: "",
        errorMsg: action.payload,
      };
    case tickerActionTypes.TICKER_RESET:
      return {
        ...state,
        loading: false,
        data: "",
        errorMsg: "",
      };
    default:
      return state;
  }
};
