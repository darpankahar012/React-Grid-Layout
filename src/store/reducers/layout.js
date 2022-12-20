import { layoutActionTypes } from "../constants";

const initialState = {
  loading: false,
  data: "",
};

export const layout = (state = initialState, action) => {
  switch (action.type) {
    case layoutActionTypes.LAYOUT:
      return {
        ...state,
        loading: true,
        data: "",
      };
    case layoutActionTypes.LAYOUT_STORE:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return state;
  }
};
