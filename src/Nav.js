import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

import { MDBIcon } from "mdbreact";


export function Navi() {

    return (
        <Navbar expand="false" sticky="top" > 
            <Navbar.Toggle className="navButton" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link className="navLink" to="/">Home</Link>
                    <Link className="navLink" to="/portfolio">Portfolio</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export function Footer() {

    return (
        <div id="socialMediaFooter">
            <a href="#twitter" className="mx-2">
                <MDBIcon fab icon="twitter" size="2x" />
            </a>
            <a href="#facebook" className="mx-2">
                <MDBIcon fab icon="facebook" size="2x" />
            </a>
            <a href="#instagram" className="mx-2">
                <MDBIcon fab icon="instagram" size="2x" />
            </a>
        </div>
    )
}