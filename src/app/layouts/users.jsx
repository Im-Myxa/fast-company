/* eslint-disable semi */
/* eslint-disable indent */
import React from "react";
import { useParams } from "react-router-dom";
import EditUserPage from "../component/page/editUserPage/editUserPage";
import UserPage from "../component/page/userPage";
import UsersListPage from "../component/page/usersListPage";

const Users = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {edit ? (
                <EditUserPage userId={userId} />
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage />
            )}
            {/* {userId ? <UserPage userId={userId} /> : <UsersListPage />}
            {edit && <EditUserPage userId={userId} />} */}
        </>
    );
};

export default Users;
