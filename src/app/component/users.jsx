import React, { useState } from "react";
import PropTypes from "prop-types";

import Pagination from "./pagination";
import User from "./user";
import { paginate } from "../utils/paginate";
import UsersTableHead from "./usersTableHead";

const Users = ({ users, onToggleBookMark, onDeleteUser }) => {
    const count = users.length;
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const userCrop = paginate(users, currentPage, pageSize);

    return (
        <>
            {count > 0 && (
                <table className="table table-hover">
                    <UsersTableHead/>
                    <tbody>
                        {userCrop.map((user) => (
                            <User
                                key={user._id}
                                {...user}
                                onToggleBookMark={onToggleBookMark}
                                onDeleteUser={onDeleteUser}
                            />
                        ))}
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    );
};

Users.propTypes = {
    users: PropTypes.array.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    onDeleteUser: PropTypes.func.isRequired
};

export default Users;
