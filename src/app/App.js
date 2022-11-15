import React from "react";
import { Route, Switch } from "react-router-dom";

import NavBar from "./component/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path={"/login/:type?"} component={Login} />
                <Route path={"/users/:userId?/:edit?"} component={Users} />
                <Route path={"/"} component={Main} />
            </Switch>
        </>
    );
};

export default App;
