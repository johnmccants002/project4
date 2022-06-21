import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

export default function Menu() {

    return(
        <Nav>
            <Link>Events</Link>
            <Link>Create Event</Link>
            <Link>Profile</Link>

        </Nav>

    ) 

    
}

{/* <Link to="/events">Events</Link>
<Link to="/events/new">Create Event</Link> */}