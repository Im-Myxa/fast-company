import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ onToggleBookMark, ...user }) => {
    return (
        <button>
            <i
                onClick={() => onToggleBookMark(user._id)}
                className={
                    user.bookmark === false
                        ? "bi bi-bookmark"
                        : "bi bi-bookmark-heart-fill"
                }
            ></i>
        </button>
    );
};

BookMark.propTypes = {
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
