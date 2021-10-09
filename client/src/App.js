import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import { Navbar, Container, Nav, NavItem } from 'react-bootstrap';
import { useState } from 'react';
import Authenticate from './components/login';
import Profile from './components/profile'
import MessageForm from './components/messageForm';
import User from './components/users'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; 
// import 'bootstrap-css-only/css/bootstrap.min.css'; 
// import '@fortawesome/fontawesome-free/js/all.js';
// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  const getUser = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user;
  }

  const [user, setUser] = useState(getUser() || '');

  const saveUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  const handeLogOut = () => {
    localStorage.removeItem('user');
    setUser('');
    console.log('logout');
  }

  if(!user.token) {
    return <Authenticate saveUser={saveUser} />
  }

  return (
    <Router >
      <div>
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
            {user.user.admin ? 
            <Nav>
              <NavItem eventkey={2} href="/users">
                <Nav.Link as={Link} to="/users" >Users</Nav.Link>
              </NavItem>
            </Nav>
              : <Redirect to="/" />
            }
            <Nav className="ml-auto" >
              <NavItem eventkey={2} href="/users">
                <Nav.Link as={Link} onClick={handeLogOut}>LogOut</Nav.Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
      </Switch>
      </div>
    </Router>
  );
}

export default App;
