import React from "react";
import PropTypes from "prop-types";

import Quality from "./quality";
import BookMark from "./bookmark";

const User = ({ onToggleBookMark, ...user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>
                {user.qualities.map((item) => (
                    <Quality
                        key={item._id}
                        color={item.color}
                        name={item.name}
                        _id={item._id}
                    />
                ))}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{`${user.rate}/5`}</td>
            <td>
                <BookMark {...user} onToggleBookMark={onToggleBookMark} />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => user.onDeleteUser(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired
};

export default User;
