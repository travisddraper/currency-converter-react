import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Home from './Home.js';

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
                <Nav className="mr-auto">
                    {this.props.children}
                </Nav>
            </Navbar.Collapse>
            </Navbar>
            </>
        )
    }
}

function FooterNav() {

    return (
        <div id="socialMediaFooter">
            <a href="#" className="mx-2">
                <MDBIcon fab icon="twitter" size="2x" />
            </a>
            <a href="#" className="mx-2">
                <MDBIcon fab icon="facebook" size="2x" />
            </a>
            <a href="#" className="mx-2">
                <MDBIcon fab icon="instagram" size="2x" />
            </a>
        </div>
    )
}

export const Navi = Navigation;
export const Footer = FooterNav;