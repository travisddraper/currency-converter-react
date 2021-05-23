import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

import {Footer, Navi} from "./Nav.js"
import Dashboard from "./Dashboard.js"
import Home from "./Converter.js"


class App extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      screenWidth: window.innerWidth,
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.setState({ screenWidth: window.innerWidth})
    })
  }

  render() {
    console.log(this.state.screenWidth);
    return (
      <Router>
        <Navi screenWidth={this.state.screenWidth} />
          <Dashboard  screenWidth={this.state.screenWidth} />
        <Footer />
      </Router>
    )
  }
}

export default App;