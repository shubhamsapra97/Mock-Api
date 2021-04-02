import React, {useEffect, useState} from "react";
import {get, debounce} from "lodash";
import {withRouter} from "react-router";
import "./UserList.css";

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [userSearchInput, setUserSearchInput] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const getUsersList = async () => {
        try {
            const response = await fetch("https://reqres.in/api/users");
            if (response.status !== 200) return;

            const data = await response.json();
            const userList = get(data, "data", []);
            setUsers(userList);
        } catch {
            console.log("error fetching users");
        }
    }

    useEffect(() => {
        getUsersList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const onUseInputChange = (e) => {
        setUserSearchInput(e.target.value);
    }

    const updateUserHandler = (e) => {
        const data = JSON.parse(e.target.value);
        props.history.push(`/users/edit/${data.id}`);
    }

    const deleteUserHandler = async (e) => {
        const id = JSON.parse(e.target.value).id;
        if (window.confirm("Do you want to delete this user")) {
            try {
                const response = await fetch(`https://reqres.in/api/users/${id}`, {
                    method: "DELETE",
                });

                const status = response.status;
                if (status !== 204) {
                    setSuccessMessage("");
                    return setError(error);
                }

                let message = "User deleted successfully";
                setError("");
                setSuccessMessage(message);
            } catch(err) {
                console.log("error deleting user!", err);
            }
        }
    }

    return (
        <div className={"user-list-container"}>
            <div className={"user-filter-container"}>
                <input
                    value={userSearchInput}
                    className="user-search-input"
                    onChange={onUseInputChange}
                    placeholder={"Filter users by email, firstname, lastname"}
                />
            </div>
            <div className="add-users-container">
                <button
                    onClick={() => {
                        props.history.push("/users/add");
                    }}
                >
                    Add User
                </button>
            </div>
            <div className="user-list">
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        users.length ? (
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                    <td className="action-button-container">
                                        <button
                                            onClick={updateUserHandler}
                                            value={JSON.stringify({
                                                id: user.id,
                                                email: user.email,
                                                firstName: user.first_name,
                                                lastName: user.last_name,
                                            })}
                                            className="action-buttons"
                                        >
                                            Update
                                        </button>
                                    </td>
                                    <td className="action-button-container">
                                        <button
                                            onClick={deleteUserHandler}
                                            value={JSON.stringify({
                                                id: user.id
                                            })}
                                            className="action-buttons"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : null
                    }
                    </tbody>
                </table>
                {
                    error ? (
                        <span
                            className="white-color-text message-text"
                        >
                            {error}
                        </span>
                    ) : null
                }
                {
                    successMessage ? (
                        <span
                            className="white-color-text message-text"
                        >
                            {successMessage}
                        </span>
                    ) : null
                }
            </div>
        </div>
    );
}

export default withRouter(UserList);
