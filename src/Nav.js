import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

import { MDBRow, MDBCol, MDBIcon } from "mdbreact";


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

function FooterNav() {

    return (
        <div id="socialMediaFooter">
            <a href="#" class="mx-2">
                <MDBIcon fab icon="twitter" size="2x" />
            </a>
            <a href="#" class="mx-2">
                <MDBIcon fab icon="facebook" size="2x" />
            </a>
            <a href="#" class="mx-2">
                <MDBIcon fab icon="instagram" size="2x" />
            </a>
        </div>
    )
}

export default Navigation;
export const Footer = FooterNav;