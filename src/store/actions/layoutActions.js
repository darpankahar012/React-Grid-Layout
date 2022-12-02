import { layoutActionTypes } from "../constants";

export const layoutChange = () => {
  return {
    type: layoutActionTypes.LAYOUT,
  };
};

export const layoutChangeSuccess = (data) => {
  return {
    type: layoutActionTypes.LAYOUT_SUCCESS,
    payload: data,
  };
};
