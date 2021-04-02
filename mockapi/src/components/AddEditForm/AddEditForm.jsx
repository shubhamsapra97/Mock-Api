import React, {useEffect, useState} from "react";
import {get} from "lodash";
import {withRouter} from "react-router";
import "./AddEditForm.css";

export const AddEditForm = (props) => {
    const { id, action } = props.match.params;
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const getEditUserData = async () => {
        try {
            if (id) {
                const response = await fetch(`https://reqres.in/api/users/${id}`);
                if (response.status !== 200) return;

                const data = await response.json();
                initForm(data.data);
            }
        } catch {
            console.log("error fetching edit user data");
        }
    }

    const initForm = (editUserData) => {
        setEmail(editUserData.email);
        setFirstName(editUserData.first_name);
        setLastName(editUserData.last_name);
    }

    useEffect(() => {
        if (action === "edit") {
            getEditUserData();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);
    }

    const onFirstNameChange = (e) => {
        const value = e.target.value;
        setFirstName(value);
    }

    const onLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
    }

    const resetForm = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
    }

    const onRegisterForm = async (e) => {
        e.preventDefault();
        if (!email || !firstName || !lastName) {
            setSuccessMessage("");
            return setError("Form Fields should not be empty!");
        }

        try {
            let variables = {
                email,
                firstName,
                lastName
            }

            const url = action === "add" ?
                "https://reqres.in/api/users":
                `https://reqres.in/api/users/${id}`;

            const method = action === "add" ? "POST" : "PUT";
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(variables)
            });

            const data = await response.json();
            const status = response.status;
            const error = get(data, "error", "");

            if (status !== 201 && status !== 200) {
                setSuccessMessage("");
                return setError(error);
            }

            let message = action === "add" ?
                "User created successfully":
                "User updated successfully";

            setError("");
            setSuccessMessage(message);

            if (action === "add") {
                resetForm();
            }
        } catch(err) {
            console.log("error updating client by admin", err);
        }
    }

    return (
        <div className="add-user-container">
            <div className="user-form-header">
                <button
                    className="history-button"
                    onClick={() => {
                        props.history.replace("/users");
                    }}
                >
                    Go Back
                </button>
                <p className="heading">{"User Form"}</p>
            </div>
            <form onSubmit={onRegisterForm} className="user-form">
                <label>
                    <p>Email:</p>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        onChange={onEmailChange}
                        data-testid="email-input"
                    />
                </label>
                <label>
                    <p>First Name:</p>
                    <input
                        name="firstName"
                        type="text"
                        value={firstName}
                        onChange={onFirstNameChange}
                        data-testid="firstname-input"
                    />
                </label>
                <label>
                    <p>Last Name:</p>
                    <input
                        name="lastName"
                        type="text"
                        value={lastName}
                        onChange={onLastNameChange}
                        data-testid="lastname-input"
                    />
                </label>
                <button
                    type="submit"
                    data-testid="submit-button"
                >
                    {
                        action === "edit" ?
                        `Edit User`:
                        `Add User`
                    }
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
                {
                    successMessage ? (
                        <span
                            className="white-color-text"
                        >
                            {successMessage}
                        </span>
                    ) : null
                }
            </form>
        </div>
    );
}

export default withRouter(AddEditForm);
