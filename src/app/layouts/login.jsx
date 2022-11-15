import React, { useState } from "react";
import { useParams } from "react-router-dom";

import LoginForm from "../component/ui/loginForm";
import RegisterForm from "../component/ui/registerForm";

const Login = () => {
    const { type } = useParams();

    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );

    const toggleFormType = () => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4 text-center">Register</h3>
                            <RegisterForm />
                            <p>
                                Allready have account?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign in
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4 text-center">Login</h3>
                            <LoginForm />
                            <p>
                                {"Don't have account?"}{" "}
                                <a role="button" onClick={toggleFormType}>
                                    Sign Up
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;
