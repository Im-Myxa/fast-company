import React, { useState } from "react";
import API from "../api";

const Users= () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    };

    const handlePhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) return 'человек тусанет';
        if ([2, 3, 4].indexOf(lastOne) >= 0) return 'человека тусанут';
        if (lastOne === 1) return 'человек тусанет';
        return 'человек тусанет';
    };
    
    const handleToggleBookMark = (id) => {
        setUsers(users.map(user => {
            if (user._id === id) {
                user.bookmark = !user.bookmark
            };
            return user;
        }));
    };

    return (
        <>
            <h2>
                <span className={"badge " + (users.length > 0 ? 'bg-primary' : 'bg-danger')}>
                    {users.length > 0 ?
                    `${users.length} ${handlePhrase(users.length)} с тобой сегодня` : 'Никто с тобой не тусанет'} 
                </span>
            </h2>

            {users.length > 0 && (<table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.qualities.map(item => 
                                <span className={'badge bg-'+item.color+' m-1'} key={item._id}>{item.name}</span>)}
                            </td>
                            <td>{user.profession.name}</td>
                            <td>{user.completedMeetings}</td>
                            <td>{user.rate+'/5'}</td> 
                            <td>
                                <i onClick={() => handleToggleBookMark(user._id)} className={user.bookmark === false ? 'bi bi-check-circle' : 'bi bi-check-circle-fill'}></i>
                            </td> 
                            <td><button class="btn btn-danger" onClick={() => handleDelete(user._id)}>delete</button></td>
                        </tr>
                    ))}    
                </tbody>
            </table>)}
        </>
    );
};

export default Users;
