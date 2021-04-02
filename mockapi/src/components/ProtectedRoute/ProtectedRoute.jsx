import React, {useContext} from "react";
import {Redirect, Route} from "react-router";
import {UserProviderContext} from "../UserProvider/UserProvider";

const ProtectedRoute = ({path, component: Component}) => {
    const {isLoggedIn} = useContext(UserProviderContext);
    return (
        <Route
            path={path}
            render={props => {
                if (!isLoggedIn()) {
                    return <Redirect to={"/login"} />;
                }

                return <Component {...props} />;
            }}
        />
    );
};

export default ProtectedRoute;
