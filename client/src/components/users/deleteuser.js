import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios';

const DeleteUser = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteUser = async (e) => {
        const user = {
            username: e.target.username.value
        }
        const response = await axios.post('/users/remove', user);
        console.log(response);
        handleClose();
    }

    return (
        <div>
            <Button className="mx-1" variant="primary" onClick={handleShow}>Delete User</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>User's Infomation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mx-auto text-center" onSubmit={handleDeleteUser}>
                        <Form.Group className="w-50 mx-auto">
                            <Form.Label>Enter username</Form.Label>
                            <Form.Control type="text" name="username" autoComplete="off" />
                        </Form.Group>
                        <Form.Group>
                            <Button className="mt-3" variant="primary" type="submit">
                                Delete
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DeleteUser;