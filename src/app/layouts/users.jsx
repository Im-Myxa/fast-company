import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../component/page/editUserPage/editUserPage";
import UserPage from "../component/page/userPage/index.js";
import UsersListPage from "../component/page/usersListPage/index.js";
import UsersLoader from "../component/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";

const Users = () => {
    const params = useParams();
    const { userId, edit } = params;
    const currentUserId = useSelector(getCurrentUserId());

    return (
        <>
            <UsersLoader>
                {userId ? (
                    edit ? (
                        userId === currentUserId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/users/${currentUserId}/edit`} />
                        )
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    );
};

export default Users;
