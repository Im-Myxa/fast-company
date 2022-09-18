import React from "react";

const BookMark = ({ onBookMark, ...user}) => {
    return (
        <>
            <i onClick={() => onBookMark(user._id)} className={user.bookmark === false ? 'bi bi-check-circle' : 'bi bi-check-circle-fill'}></i>
        </>
    );  
};

export default BookMark;

