import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggleBookMark, ...user }) => {
    return (
        <i
            onClick={() => onToggleBookMark(user._id)}
            className={
                user.bookmark === false
                    ? "bi bi-bookmark"
                    : "bi bi-bookmark-fill"
            }
        ></i>
    );
};

BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
