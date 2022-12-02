import { publisherActionTypes } from "../constants";

const initialState = {
  loading: false,
  publishersList: [],
  publisherListError: "",
  publisherDetails: [],
};

export const publisher = (state = initialState, action) => {
  switch (action.type) {
    case publisherActionTypes.GET_ALL_PUBLISHERS:
      return {
        ...state,
        loading: true,
      };
    case publisherActionTypes.GET_ALL_PUBLISHERS_SUCCESS:
      return {
        ...state,
        loading: false,
        publisherListError: "",
      };
    case publisherActionTypes.GET_ALL_PUBLISHERS_ERROR:
      return {
        ...state,
        loading: false,
        publisherListError: action.payload,
      };
    default:
      return state;
  }
};
