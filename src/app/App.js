import React, { useState } from "react";
import API from "./api";
import Users from "./component/users";
import SearchStatus from "./component/searchStatus";

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    };

    const handleToggleBookMark = (id) => {
        setUsers(users.map(user => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
            };
            return user;
        }));
    }

    return (
        <div>
            <SearchStatus length={users.length}/>
            <Users
                users={users}
                onDeleteUser={handleDelete}
                onToggleBookMark={handleToggleBookMark}
            />

        </div>
    )
};

export default App;