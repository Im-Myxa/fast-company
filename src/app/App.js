import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./component/ui/navBar";
import ProtectedRoute from "./component/ui/protectedRoute";
import AuthProvider from "./hooks/useAuth";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { loadProfessionsList } from "./store/professions";
import { loadQualitiesList } from "./store/qualities";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessionsList());
    }, []);
    return (
        <>
            <AuthProvider>
                <NavBar />
                <Switch>
                    <Route path={"/login/:type?"} component={Login} />
                    <ProtectedRoute
                        path={"/users/:userId?/:edit?"}
                        component={Users}
                    />
                    <Redirect from="/edit" to="/users/:userId?/:edit?" />
                    <Route path={"/logout"} component={LogOut} />
                    <Route path={"/"} component={Main} />
                </Switch>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
