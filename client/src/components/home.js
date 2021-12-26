import {  Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Navbar, Container, Nav, NavItem } from 'react-bootstrap';
import { useState } from 'react';
import { createBrowserHistory } from 'history';
import Profile from './profile'
import MessageForm from './messageForm';
import User from './users'
import Upload from './upload'

export const history = createBrowserHistory();


const Home = ({ user, handeLogOut }) => {
    return (
        <>
        <Navbar className="d-flex" bg="light" expand="lg">
            <Container>
                <Navbar.Brand href="/">Knitu Bot</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <NavItem eventkey={1} href="/profile">
                        <Nav.Link as={Link} to="/profile" >Profile</Nav.Link>
                        </NavItem>
                    </Nav>
                    {/* {user.user.admin ? 
                    <Nav>
                        <NavItem eventkey={2} href="/users">
                        <Nav.Link as={Link} to="/users" >Users</Nav.Link>
                        </NavItem>
                    </Nav>
                        : <Redirect to="/" />
                    } */}
                    <Nav>
                        <NavItem eventkey={3} href="/upload">
                        <Nav.Link as={Link} to="/upload" >Upload</Nav.Link>
                        </NavItem>
                    </Nav>
                    <Nav className="ml-auto" >
                        <NavItem eventkey={4} href="/login">
                        <Nav.Link as={Link} to="/login" onClick={handeLogOut}>LogOut</Nav.Link>
                        </NavItem>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Router history={history}>
            <Switch>
                <Route exact path="/" >
                    <MessageForm user={user.user}/>
                </Route>
                <Route exact path="/users" >
                    <User />
                </Route>
                <Route exact path="/profile">
                    <Profile user={user.user} />
                </Route>
                <Route exact path="/upload">
                    <Upload user={user.user} />
                </Route>
            </Switch>
        </Router>
        </>
    )
}

export default Home;