import React from "react";
import API from "../api";

const UserPage = (userId) => {
    const user = API.users.getById(userId);

    return (
        <>
            {user.name}
            {user.rate}
        </>
    );
};

export default UserPage;
