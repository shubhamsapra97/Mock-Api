import React, {useState, useContext, useEffect} from "react";
import {get} from "lodash";
import {withRouter} from "react-router";
import {UserProviderContext} from "../UserProvider/UserProvider";
import "./Login.css";

const LoginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userProvider = useContext(UserProviderContext);

    const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onPasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
    }

    useEffect(() => {
        localStorage.clear();
    }, []);

    const loginHandler = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            return setError("Form Fields should not be empty!");
        }

        const variables = {email, password};
        try {
            const response = await fetch("https://reqres.in/api/login", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(variables)
            });
            
            const data = await response.json();
            if (response.status !== 200) {
                return setError(data.error);
            }

            const token = get(data, "token", "");
            const userData = {token, email};
            userProvider.updateUser(userData);
            localStorage.setItem("userData", JSON.stringify(userData));
            props.history.replace("/users");
        } catch {
            props.history.replace("/login");
        }
    }

    return (
        <div className="container">
            <form onSubmit={loginHandler} className="login-form">
                <label className="abc">
                    <p>Email:</p>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        className="login-input"
                        onChange={onEmailChange}
                    />
                </label>
                <label className="abc">
                    <p>Password:</p>
                    <input
                        name="password"
                        type="password"
                        value={password}
                        className="login-input"
                        onChange={onPasswordChange}
                    />
                </label>
                <button type="submit">
                    Login
                </button>
                {
                    error ? (
                        <span
                            className="white-color-text"
                        >
                            {error}
                        </span>
                    ) : null
                }
            </form>
        </div>
    );
}

export default withRouter(LoginPage);
