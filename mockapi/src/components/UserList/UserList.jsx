import React, {useEffect, useState} from "react";
import {get, debounce} from "lodash";
import {withRouter} from "react-router";
import UserSearch from "../UserSearch/UserSearch";
import "./UserList.css";

const UserList = (props) => {
    const [users, setUsers] = useState([]);
    const [usersCopy, setUsersCopy] = useState([]);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const getUsersList = async () => {
        try {
            const response = await fetch("https://reqres.in/api/users");
            if (response.status !== 200) return;

            const data = await response.json();
            const userList = get(data, "data", []);
            setUsers(userList);
            setUsersCopy(userList)
        } catch {
            console.log("error fetching users");
        }
    }

    useEffect(() => {
        getUsersList();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const filterUserTable = (searchInput) => {
        if(!searchInput) return setUsers(usersCopy);

        const filterKeys = ["email", "first_name", "last_name"];
        const filteredRows = users.filter(user =>
            filterKeys.some(key =>
                user[key].toString().toLowerCase().indexOf(searchInput.toLowerCase()) > -1
            )
        );
        setUsers(filteredRows);
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

    const search = debounce(filterUserTable, 500);

    return (
        <div className={"user-list-container"}>
            <UserSearch
                onSearch={search}
            />
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
