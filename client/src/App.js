import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import Home from './components/home';
import Authenticate from './components/login';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
      <Router >
        <div >
          <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand href="/">Knitu Bot</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="/home">Home</Nav.Link> */}
                  <Nav.Link href="/login">Login</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>

          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          {/* <Redirect exact from="/" to="/" /> */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <Authenticate />
            </Route>
          </Switch>
        </div>
      </Router>


  );
}

export default App;
