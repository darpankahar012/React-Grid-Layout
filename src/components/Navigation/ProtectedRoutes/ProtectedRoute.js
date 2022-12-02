import {
  //  React,
  useEffect,
  useState,
} from "react";
import { useHistory } from "react-router-dom";
// import { connect } from "react-redux";
// import axios from "axios";
// import moment from "moment";
// import { loginSuccess, loginInvalid } from "../store/actions";
// import { useDispatch, useSelector } from "react-redux";

function ProtectedRoute(props) {
  const [isAuth, setIsAuth] = useState(false);
  const history = useHistory();
  var currentLocation = window.location.pathname;

  //   const dispatch = useDispatch();
  //   const { data } = useSelector((state) => state.auth);

  async function validateToken() {
    let token = localStorage.getItem("token");
    if (token) {
      setIsAuth(true);
      return;
    } else {
      history.push("/login");
    }
  }

  useEffect(() => {
    validateToken();
  }, [currentLocation]);

  if (isAuth === null) return null;

  return props.children;
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.login.data,
//         apiStatus: state.apiStatus,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         setLoginData: (data) => dispatch(loginSuccess(data)),
//         invalidToken: (data) => dispatch(loginInvalid(data)),
//     };
// };

export default ProtectedRoute;
