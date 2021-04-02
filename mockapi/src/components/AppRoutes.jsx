import React, {Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import LoginPage from "./Login/Login";

const AppRoutes = () => (
    <Suspense fallback={<div />}>
        <Router>
            <Switch>
                <Route path="/" exact component={LoginPage} />
                <Route path="/login" component={LoginPage} />
                <ProtectedRoute path="/users" component={LoginPage} />
            </Switch>
        </Router>
    </Suspense>
);

export default AppRoutes;