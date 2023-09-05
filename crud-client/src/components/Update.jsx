import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedUsers = useLoaderData();

    const handleUpdate = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const updatedUser = { name, email }
        console.log(updatedUser);
        fetch(`http://localhost:4000/users/${loadedUsers._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    console.log('Updated')
                }
            })
    }

    return (
        <div>
            name: {loadedUsers.name}

            <form onSubmit={handleUpdate} action="">
                <input type="text" name='name' defaultValue={loadedUsers.name} /><br />
                <input type="email" name='email' defaultValue={loadedUsers.email} /><br />
                <input type="submit" value={'Update'} />
            </form>
        </div>
    );
};

export default Update;