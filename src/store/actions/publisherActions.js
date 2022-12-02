import { publisherActionTypes } from "../constants";

export const getAllPublishers = () => {
  return {
    type: publisherActionTypes.GET_ALL_PUBLISHERS,
  };
};

export const getAllPublishersSuccess = (data) => {
  return {
    type: publisherActionTypes.GET_ALL_PUBLISHERS_SUCCESS,
    payload: data,
  };
};

export const getAllPublishersError = (error) => {
  return {
    type: publisherActionTypes.GET_ALL_PUBLISHERS_ERROR,
    payload: error,
  };
};
export const getPublisherDetails = (data) => {
  return {
    type: publisherActionTypes.GET_PUBLISHER_DETAILS,
    payload: data,
  };
};

export const createPublisher = (data) => {
  return {
    type: publisherActionTypes.CREATE_PUBLISHER,
    payload: data,
  };
};

export const clearPublisherDetails = () => {
  return {
    type: publisherActionTypes.CLEAR_PUBLISHER_DETAILS,
  };
};
