import React from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./component/ui/navBar";
import AuthProvider from "./hooks/useAuth";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualitiesProvider } from "./hooks/useQualities";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
    return (
        <>
            <AuthProvider>
                <NavBar />

                <ProfessionProvider>
                    <QualitiesProvider>
                        <Switch>
                            <Route path={"/login/:type?"} component={Login} />
                            <Route
                                path={"/users/:userId?/:edit?"}
                                component={Users}
                            />
                            <Route path={"/"} component={Main} />
                        </Switch>
                    </QualitiesProvider>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </>
    );
};

export default App;
