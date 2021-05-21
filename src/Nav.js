import React from 'react';
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';

import { MDBIcon } from "mdbreact";


function SideNav(props) {

    const {navBar, handleNav } = props

    return (
        <div id="sidebar" className="sidebar col-4 col-lg-3" aria-label="sidebar" aria-hidden={navBar}>
            <div className="sidebar_content">
                <button id="sidebarToggle" data-toggle-sidebar="sidebar1" aria-label="sidebar" rotate={navBar} className="toggleTest" onClick={handleNav} >
                    <MDBIcon icon="arrow-right" size="2x" />
                </button>
                <h1 className="navTitle">Travel Money</h1>
                <hr className="sideBarBreak" />
                <div className="sidebarRow row">
                    <div className="linkCol">
                        <Link className="navLink" to="/">Dashboard</Link>
                    </div>
                    <div className="linkCol">
                        <Link className="navLink" to="/chart">Conversion Chart</Link>
                    </div>
                    <div className="linkCol">
                        <Link className="navLink" to="/graph">Conversion Graph</Link>
                    </div>
                    <div className="linkCol">
                        <Link className="navLink" to="/destination">Chance Destinations</Link>
                    </div>
                    <div className="linkCol">
                        <Link className="navLink" to="/portfolio">Portfolio</Link>
                    </div>             
                </div>
            </div>
        </div>
    )
}

function SmallNav() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#topTag">Travel Money</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#graphTag">Conversion Graph</Nav.Link>
                        <Nav.Link href="#chartTag">Conversion Chart</Nav.Link>
                        <Nav.Link href="#destinationsTag">Chance Destinations</Nav.Link>
                        <Nav.Link href="/portfolio">Portfolio</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
        </Navbar>
    )
}


export class Navi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navBar: 'true',
        }
        this.handleNav = this.handleNav.bind(this);
    }

    handleNav() {
        this.setState({ navBar: this.state.navBar == 'false' ? 'true' : 'false' })
        document.getElementById('sidebarToggle').setAttribute("transform", "rotate(180deg)")
    }

    render() {
        const screenWidth = this.props.screenWidth;
        const navBar = this.state.navBar;
        return (
            <>
            {screenWidth >= 768 
                ? <SideNav navBar={navBar} handleNav={this.handleNav} />
                : <SmallNav />
            }
            </>
        )

    }
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