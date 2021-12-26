import { Form, Button, Modal } from 'react-bootstrap'
import { useState } from 'react';
import axios from 'axios';

const CreateUpload = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [file, setFile] = useState({})

    const onChangeFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", file)
        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
        }
        const res = await axios.post('/users/upload', formData, config)
    }

    return (
        <div>
            <Button className="mx-1" variant="primary" onClick={handleShow}>Upload</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload file</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="mx-auto text-center" onSubmit={handleSubmit}>
                        <Form.Group className="w-50 mx-auto form-control-file">
                            <Form.Label>File</Form.Label>
                            <Form.Control type="file" name="file" onChange={onChangeFile} />
                        </Form.Group>
                        <Form.Group>
                            <Button className="btn btn-default" variant="primary" type="submit">
                                Update
                            </Button>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default CreateUpload;