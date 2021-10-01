import './App.css';
import { BrowserRouter as Router, Switch, Route, BrowserRouter } from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap'
import { Navbar, Container, Nav } from 'react-bootstrap';
import Home from './components/home';
import Authenticate from './components/login';
import { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { authenticate } from 'passport';

const App = () => {

  const getToken = () => {
    return localStorage.getItem('token');
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  const handeLogOut = () => {
    localStorage.removeItem('token');
    setToken('');
    console.log('logout');
  }

  if(!token) {
    return <Authenticate saveToken={saveToken} />
  }

  return (
    
    <BrowserRouter>
      <Router >
        <div >
          <Navbar bg="light" expand="lg">
            <Container>
              {/* <LinkContainer> */}
                <Navbar.Brand href="/">Knitu Bot</Navbar.Brand>
              {/* </LinkContainer> */}
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="/home">Home</Nav.Link> */}
                    <Nav.Link onClick={handeLogOut}>LogOut</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route exact path="/logout">

            </Route> */}
          </Switch>
        </div>
      </Router>
    </BrowserRouter>


  );
}

export default App;
