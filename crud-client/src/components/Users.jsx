import React, { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const Users = () => {
    const loadedUsers = useLoaderData()
    const [users, setUsers] = useState(loadedUsers);

    const handleDelete = (id) => {
        console.log(`Delete ${id}`);
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE',

        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                const remainingUsers = users.filter(user => user._id !== id);
                setUsers(remainingUsers);
            })
    }
    return (
        <div>
            <h3>
                users:{users.length}
            </h3>
            <Link to='/'>home</Link>

            <div>
                {users.map(user => <p key={user._id}>{user.name} : {user.email} <button onClick={() => handleDelete(user._id)}>X</button> </p>)}
            </div>
        </div>
    );
};

export default Users;