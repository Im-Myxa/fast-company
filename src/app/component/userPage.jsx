import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import API from "../api";
import Quality from "./quality";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    const history = useHistory();

    const handleReset = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                {user.qualities.map((qual) => (
                    <Quality {...qual} key={qual._id}/>
                ))}
                <h5>completedMeetings: {user.completedMeetings}</h5>
                <h2>Rate: {user.rate}</h2>
                <button onClick={() => handleReset()}>
                    Все пользователи
                </button>
            </>
        );
    };
    return (<h1>Loading</h1>);
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
