import { useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap'
import axios from 'axios';

const DeleteUpload = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDelete = async (e) => {
        e.preventDefault();
        const file = {
            doc_id: e.target.id.value
        }
        const response = await axios.post('/users/deleteUpload', file);
        console.log(response);
        handleClose();
    }

    return (
        <div>
            <Button className="mx-1" variant="primary" onClick={handleShow}>Delete</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mx-auto text-center" onSubmit={handleDelete}>
                        <Form.Group className="w-50 mx-auto">
                            <Form.Label>Enter ID file</Form.Label>
                            <Form.Control type="text" name="id" autoComplete="off" />
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

export default DeleteUpload;