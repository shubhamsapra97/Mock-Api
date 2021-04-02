import React, {useState} from "react";
import "./UserSearch.css";

const UserSearch = ({onSearch}) => {
    const [userSearchInput, setUserSearchInput] = useState("");

    const onUserInputChange = (e) => {
        setUserSearchInput(e.target.value);
        onSearch(e.target.value);
    }

    return (
        <div className={"user-filter-container"}>
            <input
                value={userSearchInput}
                className="user-search-input"
                onChange={onUserInputChange}
                data-testid="search-input"
                placeholder={"Filter users by email, firstname, lastname"}
            />
        </div>
    );
}

export default UserSearch;
