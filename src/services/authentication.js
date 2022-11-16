import axios from "axios";
import {
  login,
  loginError,
  loginInvalid,
  loginSuccess,
  getUserDetails,
  userDetails,
  userDetailsInvalid,
  userDetailsError,
  register,
  registerSuccess,
  registerError,
  notesList,
  notesListSuccess,
  notesListError,
} from "../store/actions";

export class AuthenticationService {
  static Login = (data) => {
    return (dispatch) => {
      dispatch(login());
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/login`,
          data)
        .then((response) => {
          localStorage.removeItem("access_token");
          if (response.data.status === 1) {
            localStorage.setItem("access_token", response.data.responsedata.token);
            dispatch(loginSuccess(response.data.responsedata));
          } else {
            dispatch(loginInvalid(response.data.message));
          }
        })
        .catch((error) => {
          localStorage.clear();
          dispatch(loginError("Login error"));
        });
    };
  };
  static registerUser = (data) => {
    return (dispatch) => {
      dispatch(register());
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/register`,
          data)
        .then((response) => {
          console.log("🚀 ~ file: authentication.js ~ line 45 ~ AuthenticationService ~ .then ~ response", response)
          if (response.data.status === 1) {
            dispatch(registerSuccess(true));
          } else {
            dispatch(registerError(true));
          }
        })
        .catch((error) => {
          dispatch(registerError("Registration error"));
        });
    };
  };



  static notesListing = (data) => {
    return (dispatch) => {
      dispatch(notesList());
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/list-notes`,
          data, {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          console.log("🚀 ~ file: authentication.js ~ line 45 ~ AuthenticationService ~ .then ~ response", response)
          if (response.data.status === 1) {
            dispatch(notesListSuccess(true));
          } else {
            dispatch(notesListError(true));
          }
        })
        .catch((error) => {
          dispatch(notesListError("Notes Listing error"));
        });
    };
  };



  static GetUserDetails = () => {
    return (dispatch) => {
      dispatch(getUserDetails());
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/account/profile`, {
          headers: {
            "content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        .then((response) => {
          if (response.data.acknowledge === 1) {
            dispatch(userDetails(response.data));
          } else {
            dispatch(userDetailsInvalid(response.data.message));
          }
        })
        .catch((error) => {
          dispatch(userDetailsError(error));
        });
    };
  };
}
