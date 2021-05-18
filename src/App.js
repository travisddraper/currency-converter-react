import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import DropdownButton from 'react-bootstrap/DropdownButton'
import { MDBRow, MDBCol, MDBIcon, MDBBtn } from "mdbreact";

import './App.css';

import {Footer, Navi} from "./Nav.js"
import Home from "./Home.js"
import Portfolio from './Portfolio.js'

/*class Background extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate() {
    console.log(window.innerWidth);
  }

  render() {
    return(
      <div className="background">
        {this.props.children}
      </div>
    )
  }
}*/

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  //Below is fixing an issue with CSS "background-attachment: fixed" on mobile browsers
  //in which the background momentarily stutters and visibly resizes as
  //the url slides up to hidden
  componentDidMount() {
    window.addEventListener('touchmove resize', () =>{
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
      //document.getElementById('root').setAttribute("style", `min-height: ${window.innerHeight}px`)
    })
  }

  render() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)

    return (
      <>
      <Router>
          <Navi/>
            <Switch>
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/" component={Home} />
            </Switch>
          <Footer />
      </Router>
      </>
    )
  }
}

export default App;