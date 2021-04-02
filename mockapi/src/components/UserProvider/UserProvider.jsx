import React, {useState} from "react";

export const UserProviderContext = React.createContext({});

const UserProvider = ({children}) => {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("userData"))
    );

    const updateUser = (data) => {
        if (Object.keys(data).length > 0) {
            setUser(data);
        }
    }

    const isLoggedIn = () => {
        return !!user;
    }

    const value = {
        user,
        updateUser,
        isLoggedIn,
    };

    return (
        <UserProviderContext.Provider value={{user, updateUser, isLoggedIn}}>
            {children}
        </UserProviderContext.Provider>
    );
}

UserProvider.Context = UserProviderContext;

export default UserProvider;
