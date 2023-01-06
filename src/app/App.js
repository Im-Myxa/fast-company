import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AppLoader from "./component/ui/hoc/appLoader";
import NavBar from "./component/ui/navBar";
import ProtectedRoute from "./component/ui/protectedRoute";
import Login from "./layouts/login";
import LogOut from "./layouts/logOut";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <AppLoader>
                <NavBar />
                <Switch>
                    <Route path={"/login/:type?"} component={Login} />
                    <ProtectedRoute
                        path={"/users/:userId?/:edit?"}
                        component={Users}
                    />
                    {/* <Redirect from="/edit" to="/users/:userId?/:edit?" /> */}
                    <Route path={"/logout"} component={LogOut} />
                    <Route path={"/"} component={Main} />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </>
    );
};

export default App;
