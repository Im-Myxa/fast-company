import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";

const User = ({ onToggleBookMark, ...user }) => {
    return (
        <tr>
            <td>{user.name}</td>
            <td>{user.qualities.map(item => 
                <Qualitie
                    key={item._id}
                    color={item.color}
                    name={item.name}
                    _id={item._id}
                />)}
            </td>
            <td>{user.profession.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate+'/5'}</td> 
            <td>
                <BookMark
                    {...user}
                    onBookMark={onToggleBookMark}
                />
            </td> 
            <td><button className="btn btn-danger" onClick={() => user.onDeleteUser(user._id)}>delete</button></td>
        </tr>
    )
};

export default User;

