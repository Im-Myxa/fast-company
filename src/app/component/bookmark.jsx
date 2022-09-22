import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onBookMark, ...user }) => {
    return (
        <>
            <i
                onClick={() => onBookMark(user._id)}
                className={
                    user.bookmark === false
                        ? "bi bi-check-circle"
                        : "bi bi-check-circle-fill"
                }
            ></i>
        </>
    );
};

BookMark.propTypes = {
    onBookMark: PropTypes.func.isRequired
};

export default BookMark;
