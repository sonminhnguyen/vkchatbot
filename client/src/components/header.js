import { Navbar, Container, Nav, NavItem } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

const Header = ({ user, handeLogOut, history }) => {
    return (
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
            <Nav>
              <NavItem eventkey={3} >
                <Nav.Link  as={Link} to="/upload" >Upload</Nav.Link>
              </NavItem>
            </Nav>
            
            {user.user.admin ? 
                <Nav>
                    <NavItem eventkey={2} >
                        <Nav.Link as={Link} to="/users">Users</Nav.Link>
                    </NavItem>
                </Nav>
              : 
              <Redirect from="/users" to="/" />
            }
            <Nav className="ml-auto" >
              <NavItem eventkey={4}>
                <Nav.Link onClick={handeLogOut}>LogOut</Nav.Link>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default Header;