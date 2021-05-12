import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';


class Navigation extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <>
            <Navbar expand="false">
            <Navbar.Toggle className="navButton" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                {this.props.children}
            </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
}

export default Navigation;