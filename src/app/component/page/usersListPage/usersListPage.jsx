/* eslint-disable indent */
import React, { useState, useEffect } from "react";

import _ from "lodash";

import Pagination from "../../common/pagination";
import { paginate } from "../../../utils/paginate";
import UsersTable from "../../ui/usersTable";
import GroupList from "../../common/groupList";
import ShowStatus from "../../ui/showStatus";
import SearchString from "../../ui/searchString";
import { useUser } from "../../../hooks/useUsers";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const UsersListPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { currentUser } = useAuth();
    const { professions, isLoading: isLoadingProfession } = useProfessions();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const [searchQuery, setSearchQuery] = useState("");

    const pageSize = 8;

    const { users } = useUser();

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        if (searchQuery !== "") {
            setSearchQuery("");
        }
        setSelectedProf(item);
    };

    const handleSerchQuery = (event) => {
        setSelectedProf(undefined);
        setSearchQuery(event.target.value);
        console.log(searchQuery);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const handleSort = (item) => {
        setSortBy(item);
    };

    // selectedProf
    //     ? users.filter((user) => user.profession === selectedProf)
    //     : searchQuery
    //     ? users.filter((user) =>
    //           user.name.toLowerCase().indexOf(searchQuery.toLowerCase())
    //       )
    //     : users;
    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== 1
              )
            : selectedProf
            ? data.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : data;
        return filteredUsers.filter((user) => user._id !== currentUser._id);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

    return (
        <div className="d-flex">
            {professions && !isLoadingProfession && (
                <div className="d-flex flex-column flex-shrink-0 p-2">
                    <GroupList
                        selectedItem={selectedProf}
                        items={professions}
                        onItemSelect={handleProfessionSelect}
                    />
                    <button
                        className="btn btn-secondary mt-2"
                        onClick={clearFilter}
                    >
                        Очистить фильтр
                    </button>
                </div>
            )}
            <div className="d-flex flex-column">
                <ShowStatus length={count} />

                <SearchString
                    value={searchQuery}
                    handleSearch={handleSerchQuery}
                />

                {count > 0 && (
                    <UsersTable
                        users={userCrop}
                        onToggleBookMark={handleToggleBookMark}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default UsersListPage;
