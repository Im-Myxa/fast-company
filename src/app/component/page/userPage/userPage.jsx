import React, { useState, useEffect } from "react";

import PropTypes from "prop-types";

import API from "../../../api";
import UserCard from "../../ui/userCard";
import MeetingsCard from "../../ui/meetingsCard";
import QualitiesCard from "../../ui/qualitiesCard";
import Comments from "../../ui/comments";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        API.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard meetings={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <Comments />
                    </div>
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
