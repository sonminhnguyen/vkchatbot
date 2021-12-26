import { useEffect, useState } from 'react';
import { MDBDataTableV5 } from 'mdbreact';
import CreateUser from './users/createuser';
import { getUsers } from './data';
import DeleteUser from './users/deleteuser';


const User = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers().then(data => setUsers(data))
    }, [])

    return (
        <>
            <h1>list users</h1>
            <div className="d-flex justify-content-end">
                <DeleteUser />
                <CreateUser />
            </div>
            <TopSearch users={users}/>
        </>
    )
}

function TopSearch ({ users }) {
    const data = {
        columns: [
            {
                label: 'Username',
                field: 'username',
                width: 150,
                attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
                },
            },
            {
                label: 'Profile',
                field: 'profile',
                width: 270,
            },
            {
                label: 'Create at',
                field: 'create_at',
                sort: 'disabled',
                width: 150,
            },
        ],
        rows: users
    }

    return (
        <MDBDataTableV5
            hover
            entriesOptions={[5, 20, 25]}
            entries={5}
            pagesAmount={4}
            data={data}
            searchTop
            searchBottom={false}
        />
    )
}

export default User;