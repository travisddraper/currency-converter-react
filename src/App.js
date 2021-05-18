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
    this.state = {
      screenHeight: window.screenHeight,
    }
    
  }

  //Below is fixing an issue with background-attachment: fixed on mobile browsers
  //in which the background momentarily stutters and visibly resizes as
  //the url slides up to hidden
  componentDidMount() {
    window.addEventListener('resize', () =>{
      this.setState({ screenHeight: window.innerHeight })
      document.getElementById('root').setAttribute("style", `min-height: ${this.state.screenHeight}px`)
    })
  }

  render() {
    document.getElementById('root').setAttribute("style", `min-height: ${window.innerHeight}px`)

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