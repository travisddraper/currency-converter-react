import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";

import './App.css';

import {Footer, Navi} from "./Nav.js"
import Home from "./Home.js"
import Portfolio from './Portfolio.js'

function Background(props) {

  return(
    <div className="background">
      {props.children}
    </div>
  )
}

function App() {

  return (
    <>
    <Router>
      <Background>
        <Navi/>
          <Switch>
            <Route path="/portfolio" component={Portfolio} />
            <Route path="/" component={Home} />
          </Switch>
      <Footer />
    </Background>
    </Router>
    </>
  );
}

export default App;
