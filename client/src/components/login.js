import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'

const login = () => {
    return (
        <>
        <p>login site</p>
            <Form style={{textAlign: 'center'}} >
                <Row className="d-flex justify-content-center">
                    <Col xs="6" md="4" >
                        <Form.Label column sm="2">Username</Form.Label>
                        <Form.Control size="sm" type="username" placeholder="Enter username" />
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                    <Col xs="6" md="4">
                        <Form.Label column sm="2">Password</Form.Label>
                        <Form.Control size="sm" type="password" placeholder="Password" />
                    </Col>
                </Row>    
                <Button className="mt-2" variant="primary" type="submit">
                    Submit
                </Button> 
            </Form>
        </>
    )
}

export default login;