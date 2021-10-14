import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';


const Upload = () => {
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
        const res = await axios.post('http://localhost:3000/users/upload', formData, config)
    }


    return (
        <div>
            {/* <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="file" className="form-control-file" name="file" onChange={onChangeFile}/>
                    <input type="text" className="form-control" placeholder="Number of speakers" name="nspeakers" />
                    <input type="submit" value="Upload" className="btn btn-default" />            
                </div>
            </form> */}
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
        </div>
    )
}

export default Upload;