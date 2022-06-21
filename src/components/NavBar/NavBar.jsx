import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Nav } from "react-bootstrap";

export default function NavBar(props) {

    function handleLogOut() {
        // userService.logOut();
        props.setUser(null);
    }

    return (<Navbar  bg="red" variant="light" >
        <Container>
        <Navbar.Brand href="/events">Event App</Navbar.Brand>
        <Nav className="me-auto">
        <Link to="/events">Events</Link>
        &nbsp; | &nbsp;
        <Link to="/events/new">New Event</Link>
        &nbsp; | &nbsp;
        <Link to="/profile">Profile</Link>
        &nbsp; | &nbsp;
        <Link to="" onClick={handleLogOut}>Logout</Link>
        </Nav>
        </Container>
    </Navbar>);
}