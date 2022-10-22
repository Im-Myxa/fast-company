/* eslint-disable semi */
/* eslint-disable indent */
import React from "react";
import { useParams } from "react-router-dom";
import UserPage from "../component/userPage";
import UsersList from "../component/usersList";

const Users = () => {
    const { userId } = useParams();
    console.log(userId);
    return (
    <>
        {userId ? <UserPage userId={userId}/> : <UsersList/>}
    </>
    )
};

export default Users;
