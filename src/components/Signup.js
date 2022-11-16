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

function Signup(props) {

    const dispatch = useDispatch();

    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        username: "",
        Email: "",
        Password: "",
    });

    const { registerUserData, registerUserError } = useSelector(state => state.login)

    useEffect(() => {
        if (registerUserData) {
            const { history } = props;
            history.push("/");
        }
    }, [registerUserData]);


    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const onLogin = () => {
        const { history } = props;
        history.push("/");
    }

    const onSignup = () => {
        if (data.Email === "") {
            errorToaster("Please Enter Email.");
        } else if (data.Password === "") {
            errorToaster("Please Enter Password.");
        } else {
            let req = { "username": data.username, "password": data.Password, "email": data.Email }
            dispatch(AuthenticationService.registerUser(req))
        }
    };

    return (
        <Form className="login-form">
            <h2 className="text-center">Welcome</h2>
            <FormGroup className="mb-3">
                <Input
                    name="username"
                    value={data.username}
                    placeholder={"username"}
                    type="text"
                    onChange={(e) =>
                        handleChange(e)
                    }
                />
            </FormGroup>
            <FormGroup className="mb-3">
                <Input
                    name="Email"
                    value={data.Email}
                    placeholder={"Email"}
                    type="email"
                    autoComplete="new-email"
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
                    onClick={() => onSignup()}
                >
                    {loader && <i class="fas fa-spinner fa-pulse"></i>}
                    {loader ? `SignUp...` : `SignUp`}
                </Button>
            </div>
            <div className="text-center">
                <Button
                    className="btn-lg btn-dark btn-block mt-3 "
                    type="button"
                    onClick={() => onLogin()}>
                    Login
                </Button>
            </div>
        </Form>
    );

}

export default Signup;
