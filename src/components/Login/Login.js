import React, { useState, useEffect } from "react";

import { Button, FormGroup, Form, Input } from "reactstrap";
import { AuthenticationService } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { errorToaster, successToaster } from "../common";
// import "./login.css";
import { useNavigate } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styles from "./login.module.css";
import { SuspenseFallbackLoader } from "../Loader";
import _ from "lodash";

function Login(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loader, setLoader] = useState(false);

  const [data, setData] = useState({
    username: "admin",
    Password: "ccadmin@2021",
  });

  const { data: userDetails, loading } = useSelector((state) => state.login);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    let token = global.localStorage.getItem("access_token");
    if (userDetails && token) {
      history.push("/");
    }
  }, [userDetails]);

  useEffect(() => {
    setLoader(loading);
  }, [loading]);

  const signUp = () => {
    const { history } = props;
    history.push("/signup");
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (data.username === "") {
      errorToaster("Please Enter Username.");
    } else if (data.Password === "") {
      errorToaster("Please Enter Password.");
    } else {
      let req = { username: data.username, password: data.Password };
      dispatch(AuthenticationService.Login(req));
    }
    // const { history } = props;
    // history.push("/");
    // navigate("/");
  };

  var users = [
    { name: "John", age: 30 },
    { name: "Jane", age: 28 },
    { name: "Bill", age: 65 },
    { name: "Emily", age: 17 },
    { name: "Jack", age: 30 },
  ];

  var reducedUsers = _.reduce(
    users,
    function (result, user) {
      if (user.age >= 18 && user.age <= 59) {
        (result[user.age] || (result[user.age] = [])).push(user);
      }

      return result;
    },
    {}
  );

  // <img class="brand-img" src="../../assets//images/logo-colored.png" alt="..."/>

  return (
    // <div class="page vertical-align text-center" data-animsition-in="fade-in" data-animsition-out="fade-out">
    //   <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
    //     <div class="panel">
    //       <div class="panel-body">
    //         <div class="brand">
    //           <img class="brand-img" src="../../assets//images/logo-colored.png" alt="..."/>
    //           <h2 class="brand-text font-size-18">Remark</h2>
    //         </div>
    //         <form method="post" action="#">
    //           <div class="form-group form-material floating" data-plugin="formMaterial">
    //             <input type="email" class="form-control" name="email" />
    //             <label class="floating-label">Email</label>
    //           </div>
    //           <div class="form-group form-material floating" data-plugin="formMaterial">
    //             <input type="password" class="form-control" name="password" />
    //             <label class="floating-label">Password</label>
    //           </div>
    //           <div class="form-group clearfix">
    //             <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
    //               <input type="checkbox" id="inputCheckbox" name="remember"/>
    //               <label for="inputCheckbox">Remember me</label>
    //             </div>
    //             <a class="float-right" href="forgot-password.html">Forgot password?</a>
    //           </div>
    //           <button type="submit" class="btn btn-primary btn-block btn-lg mt-40">Sign in</button>
    //         </form>
    //         <p>Still no account? Please go to <a href="register-v3.html">Sign up</a></p>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <Form className="login-form">
    //   <h2 className="text-center">Welcome Login</h2>
    //   <FormGroup className="mb-3">
    //     <Input
    //       name="username"
    //       value={data.username}
    //       placeholder={"username"}
    //       type="text"
    //       // autoComplete="new-email"
    //       onChange={(e) => handleChange(e)}
    //     />
    //   </FormGroup>
    //   <FormGroup>
    //     <Input
    //       name="Password"
    //       placeholder={"Password"}
    //       type="password"
    //       autoComplete="new-password"
    //       value={data.Password}
    //       onChange={(e) => handleChange(e)}
    //     />
    //   </FormGroup>
    //   <div className="text-center">
    //     <Button
    //       className="btn-lg btn-green btn-block mt-3 mb-3 "
    //       type="button"
    //       onClick={() => onLogin()}
    //     >
    //       {loader && <i class="fas fa-spinner fa-pulse"></i>}
    //       {loader ? `Login...` : `Login`}
    //     </Button>
    //   </div>
    // </Form>
    <div className={styles.mainDiv}>
      <div className={styles.formdiv}>
        <img
          className={styles.logo}
          src="../../../assets/images/logo-admin.png"
          alt="..."
        />
        <form>
          <div className={styles.formGroup}>
            <label>Username</label>
            <input
              type="text"
              className={styles.formControl}
              name="username"
              required=""
              autofocus=""
              value={data.username}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input
              type="password"
              className={styles.formControl}
              name="password"
              required=""
              value={data.Password}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg mt-40 w-100"
            onClick={(e) => onLogin(e)}
          >
            {loader && <i class="fas fa-spinner fa-pulse"></i>}
            {loader ? ` Login` : `Login`}
            {/* Login */}
          </button>
        </form>
        <div className={styles.lo_ft}>
          <span> Consumer Coverage Inc</span>
          <span>© 2021. All RIGHT RESERVED.</span>
        </div>
      </div>
    </div>
    // <div className="animsition page-login-v3 layout-full">
    //   <div
    //     class="page vertical-align text-center"
    //     data-animsition-in="fade-in"
    //     data-animsition-out="fade-out"
    //   >
    //     <div class="page-content vertical-align-middle animation-slide-top animation-duration-1">
    //       <div class="panel">
    //         <div class="panel-body">
    //           <div class="brand">
    //             <img
    //               class="brand-img"
    //               src="../../assets/images/logo-colored.png"
    //               alt="..."
    //             />
    //             <h2 class="brand-text font-size-18">Remark</h2>
    //           </div>
    //           <form method="post" action="#">
    //             <div
    //               class="form-group form-material floating"
    //               data-plugin="formMaterial"
    //             >
    //               <input type="email" class="form-control" name="email" />
    //               <label class="floating-label">Email</label>
    //             </div>
    //             <div
    //               class="form-group form-material floating"
    //               data-plugin="formMaterial"
    //             >
    //               <input type="password" class="form-control" name="password" />
    //               <label class="floating-label">Password</label>
    //             </div>
    //             <div class="form-group clearfix">
    //               <div class="checkbox-custom checkbox-inline checkbox-primary checkbox-lg float-left">
    //                 <input type="checkbox" id="inputCheckbox" name="remember" />
    //                 <label for="inputCheckbox">Remember me</label>
    //               </div>
    //               <a class="float-right" href="forgot-password.html">
    //                 Forgot password?
    //               </a>
    //             </div>
    //             <button
    //               type="submit"
    //               class="btn btn-primary btn-block btn-lg mt-40"
    //             >
    //               Sign in
    //             </button>
    //           </form>
    //           <p>
    //             Still no account? Please go to{" "}
    //             <a href="register-v3.html">Sign up</a>
    //           </p>
    //         </div>
    //       </div>

    //       <footer class="page-copyright page-copyright-inverse">
    //         <p>WEBSITE BY Creation Studio</p>
    //         <p>© 2018. All RIGHT RESERVED.</p>
    //         <div class="social">
    //           <a class="btn btn-icon btn-pure" href="javascript:void(0)">
    //             <i class="icon bd-twitter" aria-hidden="true"></i>
    //           </a>
    //           <a class="btn btn-icon btn-pure" href="javascript:void(0)">
    //             <i class="icon bd-facebook" aria-hidden="true"></i>
    //           </a>
    //           <a class="btn btn-icon btn-pure" href="javascript:void(0)">
    //             <i class="icon bd-google-plus" aria-hidden="true"></i>
    //           </a>
    //         </div>
    //       </footer>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
