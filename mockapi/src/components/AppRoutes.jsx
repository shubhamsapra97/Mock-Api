import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import LoginPage from "./Login/Login";
import UserList from "../components/UserList/UserList";
import AddEditForm from "./AddEditForm/AddEditForm";

const AppRoutes = () => (
    <Suspense fallback={<div />}>
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <ProtectedRoute path="/users" exact component={UserList} />
                <ProtectedRoute path={"/users/:action"} exact component={AddEditForm} />
                <ProtectedRoute path={"/users/:action/:id"} component={AddEditForm} />
            </Switch>
        </Router>
    </Suspense>
);

export default AppRoutes;