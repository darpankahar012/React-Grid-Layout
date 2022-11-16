import React, { useState, useEffect } from "react";

import {
    Button,
    FormGroup,
    Form,
    Input,
} from "reactstrap";
import { AuthenticationService } from "../services";
import { useDispatch, useSelector } from "react-redux";
import {
    errorToaster,
    successToaster,
} from "./common";
import "../App.css";
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        username: "",
        Password: "",
    });

    const { data: userDetails } = useSelector(state => state.login)
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        if (userDetails) {
            const { history } = props;
            history.push("/dashboard");
        }
    }, [userDetails]);

    const signUp = () => {
        const { history } = props;
        history.push("/signup");
    }

    const onLogin = () => {
        // if (data.username === "") {
        //     errorToaster("Please Enter Username.");
        // } else if (data.Password === "") {
        //     errorToaster("Please Enter Password.");
        // } else {
        //     let req = { "username": data.username, "password": data.Password }
        //     dispatch(AuthenticationService.Login(req))
        // }
        // const { history } = props;
        // history.push("/");
        navigate('/');
    };

    return (
        <Form className="login-form">
            <h2 className="text-center">Welcome Login</h2>
            <FormGroup className="mb-3">
                <Input
                    name="username"
                    value={data.username}
                    placeholder={"username"}
                    type="text"
                    // autoComplete="new-email"
                    onChange={(e) =>
                        handleChange(e)
                    }
                />
            </FormGroup>
            <FormGroup>
                <Input
                    name="Password"
                    placeholder={"Password"}
                    type="password"
                    autoComplete="new-password"
                    value={data.Password}
                    onChange={(e) =>
                        handleChange(e)
                    }
                />
            </FormGroup>
            <div className="text-center">
                <Button
                    className="btn-lg btn-green btn-block mt-3 mb-3 "
                    type="button"
                    onClick={() => onLogin()}
                >
                    {loader && <i class="fas fa-spinner fa-pulse"></i>}
                    {loader ? `Login...` : `Login`}
                </Button>
            </div>
            {/* <div className="text-center">
                <Button
                    className="btn-lg btn-dark btn-block mt-3 "
                    type="button"
                    onClick={() => signUp()}>
                    SignUp Form
                </Button>
            </div> */}
        </Form>
    );

}

export default Login;
