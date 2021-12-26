import { Form, Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreateUser = async (e) => {
        const newuser = {
            username: e.target.username.value,
            password: e.target.password.value,
            profile: e.target.profile.value,
        }
        const response = await axios.post('/users/signUp', newuser);
        console.log(response);
        handleClose();
    }

    return (
        <div>
            <Button className="mx-1" variant="primary" onClick={handleShow}>Create User</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User's Infomation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mx-auto text-center" onSubmit={handleCreateUser}>
                        <Form.Group className="w-50 mx-auto">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="username" autoComplete="off" />
                        </Form.Group>
                        <Form.Group className="w-50 mx-auto">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="text" name="password" autoComplete="off" />
                        </Form.Group>
                        <Form.Group className="w-50 mx-auto">
                            <Form.Label>Profile</Form.Label>
                            <Form.Control type="text" name="profile" autoComplete="off" />
                        </Form.Group>
                        <Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">
                                Create
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CreateUser;