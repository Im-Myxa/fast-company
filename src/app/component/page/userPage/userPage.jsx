import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";

import API from "../../../api";
import Qualities from "../../ui/qualities";
// import Quality from "../../ui/qualities/quality";

const UserPage = ({ userId }) => {
    const history = useHistory();
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleReset = () => {
        history.push("/users");
    };

    if (user) {
        return (
            <div>
                <div className="ms-2">
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>
                    {/* {user.qualities.map((qual) => (
                        <Quality {...qual} key={qual._id} />
                    ))} */}
                    <Qualities qualities={user.qualities} />
                    <h5>completedMeetings: {user.completedMeetings}</h5>
                    <h2>Rate: {user.rate}</h2>
                    <Link to={`/users/${user._id}/edit`}>
                        <button className="mb-2">Изменить</button>
                    </Link>

                    <button className="mb-2 ms-2" onClick={() => handleReset()}>
                        Вернуться к списку пользователей
                    </button>
                </div>
            </div>
        );
    }
    return "Loading...";
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
