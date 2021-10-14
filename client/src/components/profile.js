import { useState } from "react";
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';


const Profile = ({ user }) => {
    const [userInfo, setUserInfo] = useState(user)

    const handleUpdate = async(e) => {
        e.preventDefault();
        const userUpdate = {
            username: e.target.username.value,
            password: e.target.password.value,
            newpassword: e.target.newpassword.value,
            profile: e.target.profile.value,
        }
        await axios.post('/users/update', userUpdate)
        setUserInfo(userUpdate)
        e.target.password.value= ''
    }
    return (
        <>
            <Form className="mx-auto text-center" onSubmit={handleUpdate}>
                <Form.Group className="w-50 mx-auto">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" defaultValue={userInfo.username}  autoComplete="off" />
                </Form.Group>
                <Form.Group className="w-50 mx-auto">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" name="password" defaultValue=''  autoComplete="off" />
                </Form.Group>
                <Form.Group className="w-50 mx-auto">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control type="text" name="newpassword" defaultValue=''  autoComplete="off" />
                </Form.Group>
                <Form.Group className="w-50 mx-auto">
                    <Form.Label>Profile</Form.Label>
                    <Form.Control type="text" name="profile" defaultValue={userInfo.profile}  autoComplete="off" />
                </Form.Group>
                <Form.Group>
                    <Button className="mt-2" variant="primary" type="submit">
                        Update
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default Profile;